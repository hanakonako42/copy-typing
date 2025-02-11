import { Stack, StackProps, aws_elasticloadbalancingv2, aws_signer } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { readFileSync } from 'fs';
import { CfnOutput } from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as elbv2 from "aws-cdk-lib/aws-elasticloadbalancingv2";
import * as targets from "aws-cdk-lib/aws-elasticloadbalancingv2-targets";

import { WebServerInstance } from './constructs/web-server-instance';

export class CdkWordpressStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "BlogVpc", {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
    });

    const webServer1 = new ec2.Instance(this, "WordpressServer1", {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      machineImage: new ec2.AmazonLinuxImage( {
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
    });

    const script = readFileSync("./lib/resources/user-data.sh", "utf8");
    webServer1.addUserData(script);

    webServer1.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    new CfnOutput(this, "WordpressServer1PublicIPAddress", {
      value: `http://${webServer1.instancePublicIp}`,
    });

    const Database1 = new rds.DatabaseInstance(this, 'MysqlInstance1', {
      engine: rds.DatabaseInstanceEngine.mysql( { version: rds.MysqlEngineVersion.VER_8_0_36}),
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.SMALL),
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS},
      databaseName: 'wordpress'
    });

    Database1.connections.allowDefaultPortFrom(Database1);

    const alb = new elbv2.ApplicationLoadBalancer(this, 'ALB', {
      vpc,
      internetFacing: true,
    });

    const listener = alb.addListener('Listener', {
      port: 80,
    });

    listener.addTargets("ApplicationFleet", {
      port: 80,
      targets: [new targets.InstanceTarget(webServer1, 80)],
      healthCheck: {
        path: "/wp-includes/images/blank.gif",
      },
    });

    webServer1.connections.allowFrom(alb, ec2.Port.tcp(80));
  }
}
