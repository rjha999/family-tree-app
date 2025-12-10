# AWS Deployment Guide

This guide covers multiple deployment options for your Family Tree application to AWS.

## Prerequisites

1. **AWS Account** - Create one at https://aws.amazon.com
2. **AWS CLI** - Install from https://aws.amazon.com/cli/
3. **GitHub Secrets** - Configure in your repository settings

## Deployment Options

### Option 1: AWS Elastic Beanstalk + S3 (Recommended for beginners)

#### AWS Setup:
1. **Create S3 Buckets:**
   - Frontend bucket: `family-tree-frontend`
   - EB deployment bucket: `family-tree-eb-deployments`

2. **Create Elastic Beanstalk Application:**
   - Platform: .NET Core on Linux
   - Environment name: `family-tree-api-prod`

3. **Create CloudFront Distribution:**
   - Origin: Your S3 frontend bucket
   - Enable static website hosting

#### GitHub Secrets Required:
```
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
AWS_EB_BUCKET=family-tree-eb-deployments
AWS_EB_APP_NAME=family-tree-api
AWS_EB_ENV_NAME=family-tree-api-prod
AWS_S3_BUCKET=family-tree-frontend
AWS_CLOUDFRONT_DISTRIBUTION_ID=<your-distribution-id>
AWS_CLOUDFRONT_DOMAIN=<your-cloudfront-domain>
```

#### Deploy:
- Push to `main` branch triggers automatic deployment
- Workflow file: `.github/workflows/deploy-to-aws.yml`

---

### Option 2: AWS EC2 (Manual server)

#### AWS Setup:
1. **Launch EC2 Instance:**
   - AMI: Ubuntu 22.04 LTS
   - Instance type: t2.medium or better
   - Security Group: Open ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5084 (API)

2. **Connect and install dependencies:**
   ```bash
   sudo apt update
   sudo apt install -y nginx dotnet-sdk-8.0 nodejs npm git
   
   # Clone your repository
   cd /var/www
   sudo git clone https://github.com/rjha999/family-tree-app.git
   cd family-tree-app
   
   # Setup API service
   sudo nano /etc/systemd/system/family-tree-api.service
   ```

3. **Create systemd service** (`/etc/systemd/system/family-tree-api.service`):
   ```ini
   [Unit]
   Description=Family Tree API
   After=network.target

   [Service]
   WorkingDirectory=/var/www/family-tree-app/FamilyTreeAPI
   ExecStart=/usr/bin/dotnet /var/www/family-tree-app/FamilyTreeAPI/bin/Release/net8.0/FamilyTreeAPI.dll
   Restart=always
   RestartSec=10
   SyslogIdentifier=family-tree-api
   User=www-data
   Environment=ASPNETCORE_ENVIRONMENT=Production
   Environment=ASPNETCORE_URLS=http://+:5084

   [Install]
   WantedBy=multi-user.target
   ```

4. **Start services:**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable family-tree-api
   sudo systemctl start family-tree-api
   ```

5. **Configure Nginx** (`/etc/nginx/sites-available/family-tree`):
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           root /var/www/html;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:5084;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   ```bash
   sudo ln -s /etc/nginx/sites-available/family-tree /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

#### GitHub Secrets Required:
```
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
EC2_HOST=<your-ec2-public-ip>
EC2_USER=ubuntu
EC2_SSH_KEY=<your-private-key-content>
```

#### Deploy:
- Workflow file: `.github/workflows/deploy-to-ec2.yml`

---

### Option 3: AWS ECS with Docker (Production-grade)

#### AWS Setup:
1. **Create ECR Repositories:**
   ```bash
   aws ecr create-repository --repository-name family-tree-api
   aws ecr create-repository --repository-name family-tree-frontend
   ```

2. **Create ECS Cluster:**
   - Cluster name: `family-tree-cluster`
   - Infrastructure: AWS Fargate

3. **Create Task Definition:**
   - Task definition name: `family-tree-task`
   - Container 1: API (port 5084)
   - Container 2: Frontend (port 4200)

4. **Create ECS Service:**
   - Service name: `family-tree-service`
   - Launch type: Fargate
   - Load balancer: Application Load Balancer

5. **Configure Application Load Balancer:**
   - Target groups for API and Frontend
   - Health checks enabled

#### GitHub Secrets Required:
```
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
```

#### Local Docker Testing:
```bash
# Build and run locally
docker-compose up --build

# Access:
# Frontend: http://localhost:4200
# API: http://localhost:5084
```

#### Deploy:
- Workflow file: `.github/workflows/deploy-docker-ecs.yml`

---

## Setting up GitHub Secrets

1. Go to your repository: https://github.com/rjha999/family-tree-app
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret listed above for your chosen deployment method

## AWS IAM Permissions

Create an IAM user with these policies:
- **For Elastic Beanstalk:** AWSElasticBeanstalkFullAccess, AmazonS3FullAccess, CloudFrontFullAccess
- **For EC2:** AmazonEC2FullAccess
- **For ECS:** AmazonECS_FullAccess, AmazonECRFullAccess

## Cost Estimates

- **EC2 (t2.medium):** ~$30/month
- **Elastic Beanstalk:** ~$40/month
- **ECS Fargate:** ~$50-80/month (depends on usage)
- **S3 + CloudFront:** ~$5-10/month

## Monitoring

After deployment, monitor your application:
- **CloudWatch Logs:** View application logs
- **CloudWatch Metrics:** Monitor performance
- **AWS Health Dashboard:** Check service status

## Troubleshooting

### Deployment Failed:
1. Check GitHub Actions logs
2. Verify all secrets are correctly set
3. Check AWS CloudWatch logs

### Application Not Responding:
1. Check security groups allow inbound traffic
2. Verify services are running: `sudo systemctl status family-tree-api`
3. Check application logs in CloudWatch

## SSL Certificate (Optional)

For HTTPS, use AWS Certificate Manager:
1. Request certificate for your domain
2. Attach to Load Balancer or CloudFront
3. Update CORS settings in API

## Next Steps

1. Choose your deployment method
2. Set up AWS resources
3. Configure GitHub secrets
4. Push to `main` branch to trigger deployment
5. Access your application at the AWS endpoint

For questions, check AWS documentation or create an issue in the repository.
