import { Outlet } from 'react-router-dom';

import Header from '../../Components/Header/Header';

export default function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
        {/* TODO: вставить Notification компонент сюда, повесить его наабсолют,что бы он был поверх всего контента на любой страницу */}
      </main>
    </div>
  );
}
