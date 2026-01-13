import { useAppSelector } from '../../hooks/use-app-selector';
import { getUserError } from '../../store/user/user.selector';
import './error-message.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getUserError);
  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;
