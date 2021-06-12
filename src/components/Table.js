import Table from 'reactstrap/lib/Table';
import './Table.css';
import Badge from './LaunchStatusBadge';
import { Children } from 'react'

const SpacexTable = ({ data, state }) => {

	const getLaunchStatus = (upcoming, launchStatus) => {
		if (upcoming) return 'Upcoming';
		return launchStatus ? 'Success': 'Failed';
	};
	
	const renderColumns = () =>
		data.length > 0 && Children.toArray(data.map(launch =>
			<tr>
				<td>{launch.flight_number}</td>
				<td>{new Date(launch.launch_date_utc).toUTCString()}</td>
				<td>{launch.launch_site.site_name}</td>
				<td>{launch.mission_name}</td>
				<td>{launch.rocket.second_stage.payloads[0].orbit}</td>
				<td><Badge status={getLaunchStatus(launch.upcoming, launch.launch_success)} /></td>
				<td>{launch.rocket.rocket_name}</td>
			</tr>
		))
	return (
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
			{
				data.length > 0 && renderColumns()
			}
			</tbody>
		</Table>
	)
}
export default SpacexTable;