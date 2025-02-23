import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Devio from '../lib/devio-stack';

test('Vpc', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::VPC', 1);
    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.0.0.0/16',
        Tags: [ { 'Key': 'Name', 'Value': 'undefined-undefined-vpc'} ],
    });
});

test('Subnet', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::Subnet', 6);
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.11.0/24',
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-subnet-public-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.12.0/24',
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-subnet-public-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.21.0/24',
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-subnet-app-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.22.0/24',
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-subnet-app-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.31.0/24',
        AvailabilityZone: 'ap-northeast-1a',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-subnet-db-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::Subnet', {
        CidrBlock: '10.0.32.0/24',
        AvailabilityZone: 'ap-northeast-1c',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-subnet-db-1c' }]
    });
})

test('InternetGateway',() => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::InternetGateway', 1);
    template.resourceCountIs('AWS::EC2::VPCGatewayAttachment', 1);
    template.hasResourceProperties('AWS::EC2::InternetGateway', {
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-igw' }]
    });
})

test('ElasticIp', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::EIP', 2);
    template.hasResourceProperties('AWS::EC2::EIP', {
        Domain: 'vpc',
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-eip-ngw-1c'}]
    });
});

test('NatGateway', () => {
    const app = new cdk.App;
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::NatGateway', 2);
    template.hasResourceProperties('AWS::EC2::NatGateway', {
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-ngw-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::NatGateway', {
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-ngw-1c' }]
    });
});

test('RouteTable', () => {
    const app = new cdk.App;
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::RouteTable', 4);
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-public' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-app-1a' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-app-1c' }]
    });
    template.hasResourceProperties('AWS::EC2::RouteTable', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-rtb-db' }]
    });


    template.resourceCountIs('AWS::EC2::Route', 3);
    template.hasResourceProperties('AWS::EC2::Route', {
        RouteTableId: Match.anyValue(),
        DestinationCidrBlock: '0.0.0.0/0', 
        GatewayId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::Route', {
        RouteTableId: Match.anyValue(),
        DestinationCidrBlock: '0.0.0.0/0',
        NatGatewayId: Match.anyValue()
    });

    template.resourceCountIs('AWS::EC2::SubnetRouteTableAssociation', 6);
    template.hasResourceProperties('AWS::EC2::SubnetRouteTableAssociation', {
        RouteTableId: Match.anyValue(),
        SubnetId: Match.anyValue()
    })

});
