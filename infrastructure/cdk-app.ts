#!/usr/bin/env node
/**
 * 🚀 CONSCIOUSNESS REVOLUTION INFRASTRUCTURE
 * AWS CDK App for SoulCoreHub Platform
 */

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ConsciousnessRevolutionStack } from './stacks/ConsciousnessRevolutionStack';
import { SolarInfrastructureStack } from './stacks/SolarInfrastructureStack';
import { AIAgentStack } from './stacks/AIAgentStack';
import { AnalyticsStack } from './stacks/AnalyticsStack';

const app = new cdk.App();

// Environment configuration
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
};

// 🧠 Main consciousness platform stack
const consciousnessStack = new ConsciousnessRevolutionStack(app, 'ConsciousnessRevolutionStack', {
  env,
  description: 'SoulCoreHub - Love-Powered AI Infrastructure',
  tags: {
    Project: 'ConsciousnessRevolution',
    Environment: 'Production',
    Owner: 'KiwonBowens',
    CostCenter: 'SoulCoreHub',
    Purpose: 'ConsciousnessAmplification'
  }
});

// ⚡ Solar infrastructure monitoring stack
const solarStack = new SolarInfrastructureStack(app, 'SolarInfrastructureStack', {
  env,
  description: 'Solar-Powered Infrastructure Monitoring',
  tags: {
    Project: 'SolarInfrastructure',
    Environment: 'Production',
    Purpose: 'GreenEnergyMonitoring'
  }
});

// 🤖 AI Agent orchestration stack
const aiAgentStack = new AIAgentStack(app, 'AIAgentStack', {
  env,
  description: 'AI Agent Society - GPTSoul, Anima, EvoVe, Azür',
  consciousnessTable: consciousnessStack.consciousnessTable,
  tags: {
    Project: 'AIAgentSociety',
    Environment: 'Production',
    Purpose: 'ConsciousnessAmplification'
  }
});

// 📊 Analytics and metrics stack
const analyticsStack = new AnalyticsStack(app, 'AnalyticsStack', {
  env,
  description: 'Consciousness Analytics and Breakthrough Tracking',
  consciousnessTable: consciousnessStack.consciousnessTable,
  tags: {
    Project: 'ConsciousnessAnalytics',
    Environment: 'Production',
    Purpose: 'BreakthroughTracking'
  }
});

// Stack dependencies
aiAgentStack.addDependency(consciousnessStack);
analyticsStack.addDependency(consciousnessStack);
solarStack.addDependency(consciousnessStack);

app.synth();
