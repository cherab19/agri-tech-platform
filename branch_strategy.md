Team Git Workflow Guide
Step 1: Clone the Repository
All team members clone the repository:

bash
git clone https://github.com/cherab19/agri-tech-platform.git
cd agri-tech-platform
Step 2: Verify Branch Structure
Check available branches:

bash
git branch -a
Expected Output:

text
* main
  develop
  remotes/origin/main
  remotes/origin/develop
Step 3: Create Feature Branches from Develop
Each member creates feature branch from develop branch:

Member 1 (Vendor UI)
bash
# Sync with latest develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/vendor-marketplace-ui
Member 2 (Farmer/Driver UI)
bash
git checkout develop
git pull origin develop
git checkout -b feature/farmer-dashboard
Member 3 (Core Backend)
bash
git checkout develop
git pull origin develop
git checkout -b feature/database-schema
Member 4 (Payments)
bash
git checkout develop
git pull origin develop
git checkout -b feature/payment-service-setup
Step 4: Start Working on Your Branch
Work on local feature branch:

bash
# Verify current branch
git branch

# Make changes and commit
git add .
git commit -m "feat: create initial vendor product cards"
Step 5: Push Feature Branch to Remote
First time push:

bash
git push -u origin feature/your-branch-name
Example:

bash
git push -u origin feature/vendor-marketplace-ui
Step 6: Daily Workflow - Sync with Latest Changes
Before starting work each day:

bash
# Switch to develop
git checkout develop

# Pull latest changes
git pull origin develop

# Return to feature branch
git checkout feature/your-branch-name

# Merge develop changes
git merge develop

# Resolve conflicts if any
Step 7: Making Regular Commits
During development:

bash
# Add changes
git add .

# Commit with message
git commit -m "feat: add order tracking timeline component"

# Push to remote
git push origin feature/your-branch-name
Branch Naming Convention
Features
bash
git checkout -b feature/vendor-order-tracking
Bug Fixes
bash
git checkout -b fix/payment-validation-issue
Hotfixes
bash
git checkout -b hotfix/critical-security-patch
