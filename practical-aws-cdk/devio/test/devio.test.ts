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
    });
});

test('NetworkAcl', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::NetworkAcl', 3);
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-public' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-app' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-db' }]
    });

    template.resourceCountIs('AWS::EC2::NetworkAclEntry', 6);
    template.hasResourceProperties('AWS::EC2::NetworkAclEntry', {
        NetworkAclId: Match.anyValue(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0'
    });
    template.hasResourceProperties('AWS::EC2::NetworkAclEntry', {
        NetworkAclId: Match.anyValue(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0',
        Egress: true
    });

    template.resourceCountIs('AWS::EC2::SubnetNetworkAclAssociation', 6);
    template.hasResourceProperties('AWS::EC2::SubnetNetworkAclAssociation', {
        NetworkAclId: Match.anyValue(),
        SubnetId: Match.anyValue()
    });
});

test('NetworkAcl', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::EC2::NetworkAcl', 3);
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-public' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-app' }]
    });
    template.hasResourceProperties('AWS::EC2::NetworkAcl', {
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-nacl-db' }]
    });

    template.resourceCountIs('AWS::EC2::NetworkAclEntry', 6);
    template.hasResourceProperties('AWS::EC2::NetworkAclEntry', {
        NetworkAclId: Match.anyValue(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0'
    });
    template.hasResourceProperties('AWS::EC2::NetworkAclEntry', {
        NetworkAclId: Match.anyValue(),
        Protocol: -1,
        RuleAction: 'allow',
        RuleNumber: 100,
        CidrBlock: '0.0.0.0/0',
        Egress: true
    });

    template.resourceCountIs('AWS::EC2::SubnetNetworkAclAssociation', 6);
    template.hasResourceProperties('AWS::EC2::SubnetNetworkAclAssociation', {
        NetworkAclId: Match.anyValue(),
        SubnetId: Match.anyValue()
    });
});

test('IamRole', () => {
    const app = new cdk.App();
    const stack = new Devio.DevioStack(app, 'DevioStack');

    const template = Template.fromStack(stack);

    template.resourceCountIs('AWS::IAM::Role', 2);
    template.hasResourceProperties('AWS::IAM::Role', Match.objectLike({
        AssumeRolePolicyDocument: {
            Statement: [{
                Effect: 'Allow',
                Principal: {
                    Service: 'ec2.amazonaws.com'
                },
                Action: 'sts:AssumeRole'
            }]
        },
        ManagedPolicyArns: [
            'arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore',
            'arn:aws:iam::aws:policy/AmazonRDSFullAccess'
        ],
        RoleName: 'undefined-undefined-role-ec2'
    }));
    template.hasResourceProperties('AWS::IAM::Role', Match.objectLike({
        AssumeRolePolicyDocument: {
            Statement: [{
                Effect: 'Allow',
                Principal: {
                    Service: 'monitoring.rds.amazonaws.com'
                },
                Action: 'sts:AssumeRole'
            }]
        },
        ManagedPolicyArns: [
            'arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole'
        ],
        RoleName: 'undefined-undefined-role-rds'
    }));

    template.resourceCountIs('AWS::IAM::InstanceProfile', 1);
    template.hasResourceProperties('AWS::IAM::InstanceProfile', {
        Roles: Match.anyValue(),
        InstanceProfileName: 'undefined-undefined-role-ec2'
    });

    template.resourceCountIs('AWS::EC2::SecurityGroup', 3);
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for ALB',
        GroupName: 'undefined-undefined-sg-alb',
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-sg-alb' }]
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for EC2',
        GroupName: 'undefined-undefined-sg-ec2',
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-sg-ec2' }]
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroup', {
        GroupDescription: 'for RDS',
        GroupName: 'undefined-undefined-sg-rds',
        VpcId: Match.anyValue(),
        Tags: [{ 'Key': 'Name', 'Value': 'undefined-undefined-sg-rds' }]
    });

    template.resourceCountIs('AWS::EC2::SecurityGroupIngress', 4);
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        CidrIp: '0.0.0.0/0',
        FromPort: 80,
        ToPort: 80,
        GroupId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        CidrIp: '0.0.0.0/0',
        FromPort: 443,
        ToPort: 443,
        GroupId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        FromPort: 80,
        ToPort: 80,
        GroupId: Match.anyValue(),
        SourceSecurityGroupId: Match.anyValue()
    });
    template.hasResourceProperties('AWS::EC2::SecurityGroupIngress', {
        IpProtocol: 'tcp',
        FromPort: 3306,
        ToPort: 3306,

        SourceSecurityGroupId: Match.anyValue()
    });
});
