# Setting up SSH Deployment Keys

To allow GitHub Actions to deploy to your server automatically, you need to set up a dedicated SSH key pair.

## 1. Generate a new SSH Key Pair

Run this command in your local terminal (not on the server):

```bash
# Generate a new ed25519 key pair with no passphrase
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ./deploy_key -N ""
```

This will create two files in your current directory:
- `deploy_key` (Private Key)
- `deploy_key.pub` (Public Key)

## 2. Add Public Key to Server

You need to add the contents of the **Public Key** (`deploy_key.pub`) to the `authorized_keys` file on your server.

**Option A: Automatic (if you have ssh access configured)**
```bash
ssh-copy-id -i deploy_key.pub root@185.163.119.159
```

**Option B: Manual**
1. Copy the content of `deploy_key.pub`:
   ```bash
   cat deploy_key.pub
   ```
2. SSH into your server:
   ```bash
   ssh root@185.163.119.159
   ```
3. Add the key:
   ```bash
   mkdir -p ~/.ssh
   echo "PASTE_PUBLIC_KEY_CONTENT_HERE" >> ~/.ssh/authorized_keys
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

## 3. Add Private Key to GitHub

1. Copy the content of the **Private Key** (`deploy_key`):
   ```bash
   cat deploy_key
   ```
   *(Copy the entire block from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`)*

2. Go to your GitHub Repository.
3. Navigate to **Settings** > **Secrets and variables** > **Actions**.
4. Click **New repository secret**.
5. Name: `SSH_PRIVATE_KEY`
6. Value: Paste the private key content.
7. Click **Add secret**.

## 4. Cleanup

Once done, delete the keys from your local machine for security:

```bash
rm deploy_key deploy_key.pub
```
