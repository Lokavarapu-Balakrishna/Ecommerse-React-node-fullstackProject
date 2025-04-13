#!/bin/bash

# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Build the application
npm run build

# Move the build output to the correct location
mv build ../build 