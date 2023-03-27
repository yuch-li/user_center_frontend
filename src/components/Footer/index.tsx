import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = '雨晨';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'email',
          title: 'L639427@163.com',
          href: '',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GithubOutlined /> github</>,
          href: 'https://github.com/yuch-li',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
