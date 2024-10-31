import Store from '../store';

interface Imenu {
  label: string;
  page?: string;
  children?: Imenu[];
}

const Tree = ({ item: { children, label, page } }: { item: Imenu }) => {
  const { setPage, page: activePage } = Store();

  if (children) {
    return (
      <li>
        <details open={children.map((item) => item.page).includes(activePage ?? '')}>
          <summary className="rounded-full px-6">{label}</summary>
          <ul className="my-0 ms-6">
            {children.map((item, i) => (
              <Tree key={i} item={item} />
            ))}
          </ul>
        </details>
      </li>
    );
  }

  return (
    <li>
      <div
        onClick={() => {
          if (page) setPage(page);
          else setPage(null);
        }}
        className={`${
          activePage && activePage == page ? '!bg-primary text-base-100' : ''
        } rounded-full px-6`}
      >
        {label}
      </div>
    </li>
  );
};

const TreeMenu = ({ menu }: { menu: Imenu[] }) => {
  return (
    <ul className="menu m-0 bg-base-200 h-full">
      {menu.map((item, i) => (
        <Tree key={i} item={item} />
      ))}
    </ul>
  );
};

export default TreeMenu;
