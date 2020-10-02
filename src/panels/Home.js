import React, { Children } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import { Epic, Tabbar, TabbarItem, SelectMimicry, Input, Select, List,FormLayout } from '@vkontakte/vkui';

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader >Converter</PanelHeader>
		<Group >
			<FormLayout>
				<Select id="select from"
					top="Convert from"					
					placeholder="Select currency"
					options={FillData("select from")}
					onChange={() => { Conversion() }}
				>
				</Select>
			</FormLayout>
			<FormLayout>
				<Input id="Count"
					top="Count"
					placeholder="Count"
					inputMode="numeric"
					onInput={() => { Conversion() }}
				>
				</Input>
			</FormLayout>
			<FormLayout>
				<Select id="select to"
					top="Convert to"
					placeholder="Select currency"
					options={FillData("select to")}
					onChange={() => { Conversion() }}
			>			
				</Select>
			</FormLayout>
			<FormLayout>
				<Input id="Result"
					top="Result"
					readOnly="true"
					placeholder="Result">
				</Input>
			</FormLayout>
		</Group>
			
		<Group>
			<Div>
				<Button size="xl"
					level="2"
					onClick={() => { SaveHistory() }}
				>
					Save
				</Button>
			</Div>
			
			<List id="history" >
				
			</List>

		</Group>
		
	</Panel>
)
const FillData = (id) => {
	const request = require("request");
	var currency;
	request('https://api.exchangerate-api.com/v4/latest/RUB', function (error, response, body) {		
		currency = JSON.parse(body);
		currency = Object.keys(currency.rates);
		var opts = "";
		for (var i = 0; i < currency.length; i++) {
			opts += '<option value="' + currency[i] + '">' + currency[i] + '</option>';
		}		
		document.getElementById(id).innerHTML = opts
	});		
};
const Conversion = () => {
	var from = document.getElementById("select from");
	from = from.options[from.selectedIndex].label
	var to = document.getElementById("select to");
	to = to.options[to.selectedIndex].label
	var count = document.getElementById("Count");
	count = count.value;
	
	const request = require("request");
	var rate
	request('https://api.exchangerate-api.com/v4/latest/' + from, function (error, response, body) {
		var currency = JSON.parse(body);
		var rate = currency.rates[to];
		document.getElementById("Result").value = rate * count;
	});
}
const SaveHistory = () => {
	var history = document.getElementById("history");
	var from = document.getElementById("select from");
	from = from.options[from.selectedIndex].label
	var to = document.getElementById("select to");
	to = to.options[to.selectedIndex].label
	var count = document.getElementById("Count");
	count = count.value;
	var result = document.getElementById("Result");
	result = result.value;
	history.innerHTML += '<div><Text> ' + count + from + ' = ' + result + to + ' </Text ></div>';
	
}


Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
