import { Children } from 'react'
import Table from 'reactstrap/lib/Table';
import './Table.css';
import Badge from '../LaunchStatusBadge';
import { getLaunchStatus } from '../../utils';
import Loader from "react-loader-spinner";

const SpacexTable = ({ data, state, onRowClick }) => {
	const renderColumns = () =>
		data.length > 0 && Children.toArray(data.map(launch =>
			<tr onClick={() => onRowClick(launch?.flight_number)}>
				<td>{launch?.flight_number}</td>
				<td>{new Date(launch?.launch_date_utc).toUTCString()}</td>
				<td>{launch?.launch_site?.site_name}</td>
				<td>{launch?.mission_name}</td>
				<td>{launch?.rocket?.second_stage?.payloads[0]?.orbit}</td>
				<td><Badge status={getLaunchStatus(launch?.upcoming, launch?.launch_success)} /></td>
				<td>{launch?.rocket?.rocket_name}</td>
			</tr>
		))
	return (
		<>
			{
				state === 'loading' ?
					<div className={'text-center'}>
						<Loader
							type="Puff"
							color="#00BFFF"
							height={100}
							width={100}
						/>
					</div> :
					<Table>
						<thead>
						<td>No:</td>
						<td>Launched (UTC)</td>
						<td>Location</td>
						<td>Mission</td>
						<td>Orbit</td>
						<td>Launch Status</td>
						<td>Rocket</td>
						</thead>
						<tbody>
						{ data.length > 0 ? renderColumns() : 'No data to show' }
						</tbody>
					</Table>
			}

		</>
	)
}
export default SpacexTable;