import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NewsletterForm } from "../newsletter-form";

// Mock fetch
global.fetch = jest.fn();

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      placeholder: "Enter your email",
      email_label: "Email address",
      submit_label: "Subscribe",
      success_message: "Thanks for subscribing!",
      error_message: "Something went wrong. Please try again.",
    };
    return messages[key] || key;
  },
}));

describe("NewsletterForm", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("renders correctly", () => {
    render(<NewsletterForm />);
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Subscribe" })
    ).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<NewsletterForm />);

    const input = screen.getByPlaceholderText("Enter your email");
    const button = screen.getByRole("button", { name: "Subscribe" });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      });
      expect(screen.getByText("Thanks for subscribing!")).toBeInTheDocument();
    });
  });

  it("handles error on submission", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<NewsletterForm />);

    const input = screen.getByPlaceholderText("Enter your email");
    const button = screen.getByRole("button", { name: "Subscribe" });

    fireEvent.change(input, { target: { value: "test@example.com" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Something went wrong. Please try again.")
      ).toBeInTheDocument();
    });
  });
});
