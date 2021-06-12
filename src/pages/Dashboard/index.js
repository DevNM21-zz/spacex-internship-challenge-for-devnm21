import { useEffect, useState } from 'react';
import Pagination from 'reactstrap/lib/Pagination'
import PaginationItem from 'reactstrap/lib/PaginationItem'
import PaginationLink from 'reactstrap/lib/PaginationLink'
import FilterIcon from '../../assets/funnel.svg';

import './index.css'
import SpacexTable from '../../components/Table';
import API from '../../api';

const Dashboard = () => {
	
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState({ filter: null, launchSuccess: null });
	const [page, setPage] = useState(1);
	
	useEffect(() => {
		API.getLaunches(filter.filter, filter.launchSuccess, page - 1).then(res => {
			setData(res.data);
			setLoading(false);
		})
	}, [filter, page]);
	
	const handleSelect = (value) => {
		setPage(1);
		if (value === 'all') setFilter({ filter: '', launchSuccess: null });
		if (value === 'upcoming') setFilter({ filter: 'upcoming', launchSuccess: null });
		if (value === 'success') setFilter({ filter: '', launchSuccess: true });
		if (value === 'failed') setFilter({ filter: '', launchSuccess: false });
		
	}
	
	return (
		<>
				<div className={'justify-end'}>
					<img alt={'Filter'} src={FilterIcon} />
					<select onChange={e => handleSelect(e.target.value)} className={'custom-select'} >
							<option defaultChecked={true} value="all">All Launches</option>
							<option value="upcoming">Upcoming Launches</option>
							<option value="success">Success Launches</option>
							<option value="failed">Failed Launches</option>
					</select>
				</div>
			
				<SpacexTable data={data} />
				
				<div className={'justify-end'}>
					<Pagination>
						<PaginationItem disabled>
							<PaginationLink href="#" >
								{'<'}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem active>
							<PaginationLink>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem onClick={() => console.log('d')} >
							<PaginationLink onClick={() => console.log('s')} href="#">
								2
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">
								3
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">
								4
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">
								5
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink next href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink last href="#" />
						</PaginationItem>
					</Pagination>
				</div>
			
		</>
	)
}

export default Dashboard;