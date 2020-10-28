import { Flex } from './components/Grid';
import { Copyright } from './components/Text';

const Footer = () => {
   return (
    <Flex style={{ justifyContent: 'flex-end', padding: "10px 0px", width: '90vw' }}><Copyright>{`powered by {} Cloudflare Worker™`}</Copyright></Flex>
   );
};

export default Footer;