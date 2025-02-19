#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DevioStack } from '../lib/devio-stack';

const app = new cdk.App();
new DevioStack(app, 'DevioStack', {
    env: { region: 'ap-northeast-1' }
});