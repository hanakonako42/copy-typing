#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWordpressStack } from '../lib/cdk-wordpress-stack';

const app = new cdk.App();
new CdkWordpressStack(app, 'CdkWordpressStack');
