import { Paper, Typography } from '@mui/material';
import React from 'react';

import GenerateSocketImage from '../GenerateSocketImage/GenerateSocketImage';
import { formatTime, getColor } from '../../utils/utils.js';
import ScrollContainer from 'react-indiana-drag-scroll';

import './summary-view.css';

export default function SummaryView(props) {
	const { gameData, runData, totalTime } = props;
	const [ stucturedLoot, setStructuredLoot ] = React.useState({});
	const scrollRef = React.createRef();

	React.useEffect(() => {
		structureLootByRarity();
	}, []);

	const calculateTotalTime = (data) => {
		return formatTime(data.reduce((prev, next) => prev + next.time, 0));
	};

	const calculateAvgTime = (data) => {
		const time = Math.round(data.reduce((prev, next) => prev + next.time, 0) / runData.length);
		return formatTime(time);
	};

	const structureLootByRarity = () => {
		const tempLoot = {
			uncategorized: [],
			set: [],
			unique: [],
			runes: []
		};
		runData.forEach((run) => {
			run.loot.forEach((item) => {
				switch (item.rarity) {
					case 'set':
						tempLoot.set.push({ item, run: run.name });
						break;
					case 'unique':
						tempLoot.unique.push({ item, run: run.name });
						break;
					case 'rune':
						tempLoot.runes.push({ item, run: run.name });
						break;
					default:
						tempLoot.uncategorized.push({ item, run: run.name });
						break;
				}
			});
		});

		setStructuredLoot(tempLoot);
	};

	const generateLootItem = (item, run, index) => {
		console.log(item.name);
		return (
			<div key={index} id={index} className="lootItem-container">
				{item.url && (
					<img loading="lazy" height="60" src={require(`../../images/${item.url}.png`).default} alt="" />
				)}
				{!item.url ? <GenerateSocketImage sockets={item.sockets} /> : <div />}
				<span className="lootItem-text summary-text" style={{ color: getColor(item) }}>
					{item.name}
				</span>
				<Typography variant="overline" class="diablo-text">
					{run}
				</Typography>
			</div>
		);
	};

	const onStartScroll = (event) => {
		console.log('onStartScroll', event);
		//	this.setState({ dragging: true });
	};
	const onEndScroll = (event) => {
		console.log('onEndScroll', event);
		//this.setState({ dragging: false });
	};

	return (
		<div className="summaryView-container">
			<Paper style={{ width: 'fit-content', margin: '0 auto', padding: 15 }}>
				<div className="runStats-container" onDragStart={(e) => e.preventDefault()}>
					<img
						height="150px"
						className="charImg"
						src={require(`../../gifs/${gameData.class.toLowerCase()}.gif`).default}
						alt=""
					/>
					<div className={`charShadow ${gameData.class.toLowerCase()}`} />
					<div className="runStats-data">
						<Typography variant="h6" color="primary" className="diablo-text shadow">
							{gameData.name}
						</Typography>
						<div className="dataTable">
							<Typography className="diablo-text caps">Amount of runs:</Typography>
							<Typography className="alignData diablo-text caps">{runData.length} runs</Typography>
							<Typography className="diablo-text caps">Total game time:</Typography>
							<Typography className="alignData diablo-text caps">{totalTime}</Typography>
							<Typography className="diablo-text caps" style={{ width: '100%' }}>
								Total run time:
							</Typography>
							<Typography className="alignData diablo-text caps">
								{calculateTotalTime(runData)}
							</Typography>
							<Typography className="diablo-text caps">Average run time:</Typography>
							<Typography className="alignData diablo-text caps">{calculateAvgTime(runData)}</Typography>
						</div>
					</div>
				</div>
			</Paper>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
					margin: '40px 15px'
				}}
			>
				<Typography
					color="primary"
					align="center"
					variant="h4"
					style={{ marginBottom: 25 }}
					className="diablo-text shadow caps"
				>
					Loot Summary
				</Typography>
				<Paper className="scrollableItem-container">
					<Typography className="diablo-text shadow unique" style={{ width: '7%' }}>
						Unique
					</Typography>
					<ScrollContainer
						style={{ display: 'flex', width: '93%' }}
						onStartScroll={onStartScroll}
						onEndScroll={onEndScroll}
					>
						{Object.keys(stucturedLoot).length > 0 &&
							stucturedLoot.unique.map((item, index) => generateLootItem(item.item, item.run, index))}
					</ScrollContainer>
				</Paper>
				<Paper className="scrollableItem-container">
					<Typography className="diablo-text shadow set" style={{ width: '7%' }}>
						Set{' '}
					</Typography>
					<ScrollContainer
						style={{ display: 'flex', width: '93%' }}
						onStartScroll={onStartScroll}
						onEndScroll={onEndScroll}
					>
						{Object.keys(stucturedLoot).length > 0 &&
							stucturedLoot.set.map((item, index) => generateLootItem(item.item, item.run, index))}
					</ScrollContainer>
				</Paper>
				<Paper className="scrollableItem-container">
					<Typography className="diablo-text shadow crafting" style={{ width: '7%' }}>
						Runes{' '}
					</Typography>
					<ScrollContainer
						style={{ display: 'flex', width: '93%' }}
						onStartScroll={onStartScroll}
						onEndScroll={onEndScroll}
					>
						{Object.keys(stucturedLoot).length > 0 &&
							stucturedLoot.runes.map((item, index) => generateLootItem(item.item, item.run, index))}
					</ScrollContainer>
				</Paper>
				<Paper className="scrollableItem-container">
					<Typography className="diablo-text shadow" style={{ width: '7%' }}>
						<span class="magic">Magic</span> & Normal
					</Typography>
					<ScrollContainer
						style={{ display: 'flex', width: '93%' }}
						onStartScroll={onStartScroll}
						onEndScroll={onEndScroll}
					>
						{Object.keys(stucturedLoot).length > 0 &&
							stucturedLoot.uncategorized.map((item, index) =>
								generateLootItem(item.item, item.run, index)
							)}
					</ScrollContainer>
				</Paper>
			</div>
		</div>
	);
}
