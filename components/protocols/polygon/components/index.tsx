import { Typography, Popover, Button } from 'antd';
import { useAppState } from 'components/protocols/polygon/hooks'
import type { EntryT } from 'components/protocols/polygon/types';

const { Text, Paragraph } = Typography;
/*
import { getPolygonAddressExplorerURL } from 'components/protocols/polygon/lib'
<Paragraph copyable={{ text: account, tooltips: `Click to copy!` }}>
<a href={getPolygonAddressExplorerURL(account)} target="_blank" rel="noreferrer">
  <Tag color="gold">
    <Space>
      <FundViewOutlined />
      <div>View <strong>{addressToDisplay}</strong> on PolygonScan</div>
    </Space>
  </Tag>
</a>
</Paragraph>
*/

const Nav = () => {
    const { state } = useAppState();
    const { account, network } = state;

    const displayNetwork = (network: string) => network
    const displayAccount = (account: string) => `${account.slice(0,6)}...${account.slice(-4)}`
    // const displayContractKey = (contractKey: string) => `${contractKey.slice(0,5)}...${contractKey.slice(-5)}`

    const Entry = ({ msg, display, value }: EntryT) => {
        return (
            <Paragraph copyable={{ text: value }}>
                <Text strong>{msg}</Text>
                <Text code>{display(value)}</Text>
            </Paragraph>
        )
    }

    const AppState = () => {
        return (
        <>
            {network && <Entry msg={"Network: "} value={network} display={displayNetwork} />}
            {account && <Entry msg={"Account: "} value={account} display={displayAccount} />}
            {/* {contractKey && <Entry msg={"Contratc Id"} value={contractKey} display={displayContractKey} />} */}
        </>
        )
    }

    return (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
            <Popover content={AppState} placement="rightBottom">
                <Button type="primary">Storage</Button>
            </Popover>
        </div>
    )
}

export { Nav }
