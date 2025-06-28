#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ConsciousnessRevolutionStack } from '../lib/consciousness-stack';

const app = new cdk.App();

new ConsciousnessRevolutionStack(app, 'ConsciousnessRevolutionStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'SoulCoreHub - Love-Powered AI Infrastructure',
  tags: {
    Project: 'ConsciousnessRevolution',
    Environment: 'Production',
    Owner: 'KiwonBowens',
    Purpose: 'ConsciousnessAmplification'
  }
});
