import { useEffect, useState } from 'react';
import Modal from 'reactstrap/lib/Modal';
import ModalBody from 'reactstrap/lib/ModalBody';
import Button from 'reactstrap/lib/Button';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Spinner from 'reactstrap/lib/Spinner';
import LaunchStatusBadge from '../LaunchStatusBadge';

import WikiLogo from '../../assets/wiki.png';
import YoutubeLogo from '../../assets/youtube.png';
import NasaLogo from '../../assets/nasa.png';
import RocketIcon from '../../assets/r-logo.png';

import api from '../../api/index';
const LaunchDetailsModal = ({ flightNumber, show, toggle }) => {
	
	const [flightData, setFlightData] = useState({});
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		api.getLaunchByFlightNumber(flightNumber).then(res => {
			setFlightData(res.data);
			setLoading(false);
		})
	}, [flightNumber]);
	
	const renderRowsFromObject = (obj) => Object.keys(obj).map(key =>
		<Row>
			<Col md={'3'} className={'capitalize'} >{key}</Col>
			<Col>{obj[key]}</Col>
			<hr/>
		</Row>
	);
	
	const ImageLink = ({ imageSrc, href, alt }) =>
		<a
			href={href}
	    rel="noreferrer"
	    target={'_blank'} >
		<img alt={alt} src={imageSrc}/>
	</a>
	
	return <>
		<Modal size={'lg'} isOpen={show} toggle={toggle}>
			<ModalBody style={{ padding: '16px' }} >
				{
				loading ? <Spinner /> :
				<Container>
					
					<Row>
						
						<Col md={2}>
							{/* hard-coding icon here because the image host from the api is not working */}
							<img height={100} width={90} src={RocketIcon}
							     alt={'trial'}/>
						</Col>
						
						<Col>
							<h3 style={{display: 'inline-block'}} className={'launch-name-heading'}>{flightData?.mission_name}</h3>
							<LaunchStatusBadge status={'Success'}/>
							
							<p className={'silent text-info'}>{flightData?.rocket?.rocket_name}</p>
							
							{/* External Links for more information about the launch */}
							<ImageLink href={flightData?.links?.article_link} imageSrc={NasaLogo} />
							<ImageLink href={flightData?.links?.wikipedia} imageSrc={WikiLogo} />
							<ImageLink href={flightData?.links?.video_link} imageSrc={YoutubeLogo} />
							
						</Col>
						
						<Col style={{position: 'relative'}}>
							<Button onClick={toggle} style={{position: 'absolute', right: 0}} close/>
						</Col>
					</Row>
					
					<p style={{marginTop: '15px'}}>
						{flightData?.details}
						<p> - <a href={flightData?.links?.wikipedia} rel="noreferrer" target={'_blank'} >Wikipedia</a></p>
					</p>
					<Container>
						{
							renderRowsFromObject({
								'Flight Number': flightNumber,
								'Mission Name': flightData?.mission_name,
								'Rocket Name': flightData?.rocket?.rocket_name,
								'Rocket Type': flightData?.rocket?.rocket_type,
								'Manufacturer': 'Space X',
								'Nationality': 'United States',
								'Launch Date': new Date(flightData?.launch_date_utc).toUTCString(),
								'Payload Type': flightData?.rocket?.second_stage?.payloads[0]?.payload_type,
								'Orbit': flightData?.rocket?.second_stage?.payloads[0]?.orbit,
								'Launch Site': flightData?.launch_site?.site_name_long,
							})
						}
					</Container>
				</Container>
				}
			</ModalBody>
		</Modal>
	</>
};

export default LaunchDetailsModal;