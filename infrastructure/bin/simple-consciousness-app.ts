#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SimpleConsciousnessAPIStack } from '../lib/simple-api-stack';

const app = new cdk.App();

new SimpleConsciousnessAPIStack(app, 'SimpleConsciousnessAPI', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'SoulCoreHub - Simple Consciousness API',
  tags: {
    Project: 'ConsciousnessRevolution',
    Environment: 'Production',
    Owner: 'KiwonBowens',
    Purpose: 'ConsciousnessAPI'
  }
});
