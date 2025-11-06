# Team Git Workflow Guide

## Overview
This document outlines the standard workflow for creating and working with feature branches in the Agri-Tech Platform project.

---

## Step 1: Clone the Repository
All team members should start by cloning the repository:

```bash
git clone https://github.com/cherab19/agri-tech-platform.git
cd agri-tech-platform                                                                                                                                                       Step 2: Verify Branch Structure
Check available branches to ensure you can see the main structure:

bash
git branch -a
Expected Output:

text
* main
  develop
  remotes/origin/main
  remotes/origin/develop
Step 3: Create Feature Branches from Develop
Each member creates their feature branch FROM the develop branch:
forinstance:
Member 1 (Vendor UI):
bash
# Sync with latest develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/vendor-marketplace-ui
Member 2 (Farmer/Driver UI):
bash
git checkout develop
git pull origin develop
git checkout -b feature/farmer-dashboard
Member 3 (Core Backend):
bash
git checkout develop
git pull origin develop
git checkout -b feature/database-schema
Member 4 (Payments):
bash
git checkout develop
git pull origin develop
git checkout -b feature/payment-service-setup
Step 4: Start Working on Your Branch
Work on your local feature branch:

bash
# Verify you're on your feature branch
git branch  # Should show your feature branch with *

# Make changes, add files, commit
git add .
git commit -m "feat: create initial vendor product cards"
Step 5: Push Feature Branch to Remote
First time pushing your feature branch:

bash
git push -u origin feature/your-branch-name
Example for Member 1:

bash
git push -u origin feature/vendor-marketplace-ui
Step 6: Daily Workflow - Syncing with Latest Changes
Every time before starting work, sync with the latest changes:

bash
# Switch to develop branch
git checkout develop

# Pull latest changes from remote develop
git pull origin develop

# Switch back to your feature branch
git checkout feature/your-branch-name

# Merge latest develop changes into your feature branch
git merge develop

# Resolve any conflicts if they occur
Step 7: Making Regular Commits
During development:

bash
# Add your changes
git add .

# Commit with descriptive message
git commit -m "feat: add order tracking timeline component"

# Push to your remote feature branch
git push origin feature/your-branch-name
📋 Quick Reference - Branch Naming Convention
Features
bash
git checkout -b feature/vendor-order-tracking
Bug Fixes
bash
git checkout -b fix/payment-validation-issue
Hotfixes (Urgent)
bash
git checkout -b hotfix/critical-security-patch
