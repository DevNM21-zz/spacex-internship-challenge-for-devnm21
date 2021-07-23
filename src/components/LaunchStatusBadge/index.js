import './LaunchStatusBadge.css'
// available statues: 'upcoming', 'success', 'failed'
const Badge = ({ status }) => {
	return (
			<div className={'launch-status-badge status-' + status.toLowerCase()}>
				{status}
			</div>
	)
};
export default Badge;