#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkImmersionDayWorkshopTypescriptStack } from '../lib/cdk-immersion-day-workshop-typescript-stack';

const app = new cdk.App();
new CdkImmersionDayWorkshopTypescriptStack(app, 'CdkImmersionDayWorkshopTypescriptStack');
