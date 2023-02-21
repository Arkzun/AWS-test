import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import config from '../secrets_do_not_commit.json';

export class TotoStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const group = new iam.Group(this, 'Group', {
            groupName: 'ReadOnly',
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('ReadOnlyAccess')
            ]
        });

        const user = new iam.User(this, 'Users', {
            password: cdk.SecretValue.unsafePlainText(config.defaultPassword),
            passwordResetRequired: true,
            userName: 'Fish',
            groups: [iam.Group.fromGroupName(this, '123', 'ReadOnly'), iam.Group.fromGroupName(this, '456', 'mfa-group')]
        });
    }
}
