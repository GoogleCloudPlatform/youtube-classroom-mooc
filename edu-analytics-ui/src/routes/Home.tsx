import { useTranslation } from 'next-i18next'
import Student from '@/components/Student';
import Tutor from '@/components/Tutor';
interface HomeProps {

}

const Home: React.FunctionComponent<HomeProps> = ({

}) => {
  const { t } = useTranslation('home')

  const isStudent = false;

  return (

    <>
      {isStudent ? <Student /> : <Tutor />}
    </>
  );
}

export default Home;
