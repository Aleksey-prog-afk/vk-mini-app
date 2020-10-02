import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import { Epic, Tabbar, TabbarItem, SelectMimicry, Input, Select, List } from '@vkontakte/vkui';
import Home from './panels/Home';
import Persik from './panels/Persik';
import Icon28SlidersOutline from '@vkontakte/icons/dist/28/sliders_outline';
import Icon28FavoriteOutline from '@vkontakte/icons/dist/28/favorite_outline';
const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [activeStory, setActiveStory] = useState('home');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);
	const state = e => {
		setActiveStory(e.currentTarget.dataset.story);
	};
	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (

		<Epic activeStory={activeStory} tabbar={
			<Tabbar>
				
				<TabbarItem
					
					text="Converter"
					data-story="home"
					onClick={state}
				>
					<Icon28SlidersOutline />
				</TabbarItem>
				<TabbarItem
					text="Author"
					data-story="persik"
					data-to="persik"
					onClick={state}
				>
					<Icon28FavoriteOutline/>
				</TabbarItem>

			</Tabbar>
			
		}>
			<View id="home" activePanel="home" >
				<Home id="home" fetchedUser={fetchedUser} go={go}></Home>
			</View>
			<View id="persik" activePanel="persik" >
				<Persik id='persik' go={go}  />
			</View>
		</Epic>
	);
}

export default App;

