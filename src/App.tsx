import { RiMenuLine } from '@remixicon/react';
import TreeMenu from './components/TreeMenu';
import Menu from './data/menu.json';
import { useEffect, useState } from 'react';
import Store from './store';
import ReactMarkdown from 'react-markdown';

function App() {
  const { page } = Store();
  const [content, setContent] = useState('');

  const fetchMarkdown = async () => {
    if (!page) {
      setContent('');
      return;
    }

    fetch('./pages/' + page)
      .then((response) => response.text())
      .then((text) => setContent(text));
  };

  useEffect(() => {
    fetchMarkdown();
  }, [page]);

  return (
    <div className="drawer h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar fixed top-0 bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <RiMenuLine />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Pengenalan Informatika</div>
        </div>
        <div className="flex grow pt-16">
          <div className="hidden lg:block h-full bg-base-200  w-full max-w-xs">
            <div className="sticky top-16">
              <TreeMenu menu={Menu} />
            </div>
          </div>
          <div className="p-6 prose grow ">
            {content ? (
              <ReactMarkdown>{content}</ReactMarkdown>
            ) : (
              <>
                <h2>Hai! Halo!</h2>
                <p>
                  Ini adalah penugasan Pengenalan Informatika semester satu di UIN Sunan Gunung
                  Djati Bandung
                </p>
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Nama</th>
                      <td>: Diaz Adriansyah</td>
                    </tr>
                    <tr>
                      <th>NIM</th>
                      <td>: 1247050083</td>
                    </tr>
                  </tbody>
                </table>
                <span>Silakan pilih menu pada sidebar terlebih dahulu untuk melihat konten</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <TreeMenu menu={Menu} />
      </div>
    </div>
  );
}

export default App;
