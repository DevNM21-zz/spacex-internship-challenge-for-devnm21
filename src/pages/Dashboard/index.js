import { useEffect, useState, Children } from 'react';
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
	const [hasMore, setHasMore] = useState(true);
	const [pageCount, setPageCount] = useState(1);
	
	useEffect(() => {
		setLoading(true);
		API.getLaunches(filter.filter, filter.launchSuccess, page - 1).then(res => {
			setData(res.data);
			if (res.data.length >= 10) setPageCount(prev => prev += 1);
			else setHasMore(false);
			setLoading(false);
		})
	}, [filter, page]);
	
	const handleSelect = (value) => {
		setPage(1);
		setPageCount(1);
		setHasMore(true)
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
						<PaginationItem className={page === 1 ? 'disabled': ''} >
							<PaginationLink href="#" onClick={() => setPage(page => page -= 1)} >
								{'<'}
							</PaginationLink>
						</PaginationItem>
						{
							 Children.toArray(
								 Array(pageCount).fill(0).map((_, i) =>
									 <PaginationItem active={page === i + 1}>
										 <PaginationLink onClick={() => setPage(i + 1)} >
											 {i + 1}
										 </PaginationLink>
									 </PaginationItem>
								 )
							)
						}
						<PaginationItem className={!hasMore ? 'disabled': ''} >
							<PaginationLink href="#"   onClick={() => setPage(page => page += 1)} >
								{'>'}
							</PaginationLink>
						</PaginationItem>
					</Pagination>
				</div>
		</>
	)
}

export default Dashboard;