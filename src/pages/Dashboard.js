import { useEffect, useState } from 'react';
import SpacexTable from '../components/Table';
import '../api/index'
import api from '../api';
const Dashboard = () => {
	
	const [data, setData] = useState([]);
	
	useEffect(() => {
		api.getLaunches('', true).then(res => {
			setData(res.data);
		})
	}, []);
	return (
		<>
			<SpacexTable data={data} />
		</>
	)
}

export default Dashboard;