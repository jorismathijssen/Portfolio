/**
 * @jest-environment node
 */

// Mock NextResponse for testing
const mockJson = jest.fn();
const mockNextResponse = {
  json: jest.fn(() => ({
    json: mockJson,
    status: 200,
    headers: new Map([
      ['Cache-Control', 'no-cache, no-store, must-revalidate'],
      ['Pragma', 'no-cache'],
      ['Expires', '0']
    ])
  }))
};

jest.mock('next/server', () => ({
  NextResponse: mockNextResponse
}));

// Mock process.uptime
const mockUptime = jest.fn(() => 123.456);
Object.defineProperty(process, 'uptime', {
  value: mockUptime,
});

// Mock Date
const mockDate = new Date('2024-01-01T12:00:00.000Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);

describe('/api/health', () => {
  let GET: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'test';
    process.env.npm_package_version = '2.0.0';
    
    // Dynamic import to avoid module loading issues
    const module = await import('../../app/api/health/route');
    GET = module.GET;
  });

  afterEach(() => {
    delete process.env.npm_package_version;
  });

  it('returns healthy status response', async () => {
    await GET();
    
    expect(mockNextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'healthy',
        timestamp: '2024-01-01T12:00:00.000Z',
        uptime: 123.456,
        environment: 'test',
        version: '2.0.0',
      }),
      expect.objectContaining({
        status: 200,
        headers: expect.objectContaining({
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        })
      })
    );
  });

  it('uses fallback version when npm_package_version is not set', async () => {
    delete process.env.npm_package_version;
    
    await GET();
    
    expect(mockNextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        version: '2.0.0',
      }),
      expect.any(Object)
    );
  });

  it('includes environment information', async () => {
    process.env.NODE_ENV = 'production';
    
    await GET();
    
    expect(mockNextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        environment: 'production',
      }),
      expect.any(Object)
    );
  });
});