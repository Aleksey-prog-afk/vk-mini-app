import React from 'react';
import PropTypes from 'prop-types';
import { platform, IOS, Button, Div, Text } from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import { Cell } from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import persik from '../img/persik.png';
import './Persik.css';

const osName = platform();

const Persik = props => (
	<Panel id={props.id}>
		<PanelHeader>Author</PanelHeader>
		<Div>
			Ochen kryto pisat, kogda d biblioteke vkui net tega Text, no pochemu-to na
			drygoi paneli etot tag rabotaet. A ya yje govoril pro kirillicy?
			<div>
				<strong>!!!Zagadka: Kak poimat krasivyu pticy, ne slomiv ee dyx?</strong>
			</div>
		</Div>	
		<Div>
			<Button align="center" size="xl" level="1"
				onClick={() => Subscribe()}>
				Do not subscribe
			</Button>
		</Div>
		<Div>
			<Button align="center" size="xl" level="1"
			onClick={() => Repost()}>
				Repost
		</Button>
		</Div>
	</Panel>
);
async function Subscribe() {
	await bridge.send("VKWebAppJoinGroup", { "group_id": 187051532 });	
}
async function Repost() {
	await bridge.send("VKWebAppShowWallPostBox", { "message": "My first vk mini-app: https://vk.com/app7612467" });
}
Persik.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	
};

export default Persik;
