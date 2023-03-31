import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
import styles from './index.less';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { Link } from '@umijs/preset-dumi/lib/theme';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  // 表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const { password, confirmPassword } = values;
    // 校验
    if (password !== confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      // 注册
      const id = await register(values);

      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(error.message ?? defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="用户中心"
          subTitle={':('}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'注册'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '必须同时包含数字和字母，长度不能小于8位',
                  },
                ]}
              />
              <ProFormText.Password
                name="confirmPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText
                name="invitationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="邀请码（非必填）"
                rules={[
                  {
                    required: false,
                  },
                ]}
              />
              <ProFormText
                name="verificationCode"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'验证码'}
                rules={[
                  {
                    required: true,
                    message: '验证码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link to="/user/login">登录</Link>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
