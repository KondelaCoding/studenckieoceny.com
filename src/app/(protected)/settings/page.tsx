import { auth } from '@/auth';

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      session: {JSON.stringify(session)} <br />
      Settings
    </div>
  );
};

export default SettingsPage;
