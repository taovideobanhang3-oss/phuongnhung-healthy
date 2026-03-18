// script.js — MENU THUMBNAIL + CLICK VIEW FULL

const PLACEHOLDER_FOOD = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f2f6f2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238b9f8b" font-size="20">Ảnh món</text></svg>';
const PLACEHOLDER_POST = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f7f7f7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23999999" font-size="20">Ảnh bài viết</text></svg>';

let ALL_DISHES = [];
let TODAY_ITEMS = [];
let ALL_POSTS = [];

let unsubDishes = null, unsubToday = null, unsubPosts = null;
let openedGroups = new Set();

/* ================= MENU PAGE ================= */

function initMenuPage(){
  const root = document.getElementById('menu-list');

  function render(){
    root.innerHTML = '';

    if(!TODAY_ITEMS.length){
      root.innerHTML = '<p class="text-muted">Chưa có thực đơn hôm nay.</p>';
      return;
    }

    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fit,minmax(220px,1fr))';
    grid.style.gap = '14px';

    TODAY_ITEMS.forEach((d,i)=>{
      const card = document.createElement('div');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = d.img || PLACEHOLDER_FOOD;
      img.style.width = '100%';
      img.style.height = '160px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '10px';
      img.style.cursor = 'pointer';

      img.addEventListener('click', ()=>{
        const w = window.open('');
        w.document.write(`<img src="${img.src}" style="width:100%">`);
      });

      const name = document.createElement('h4');
      name.textContent = `${i+1}. ${d.name}`;
      name.style.marginTop = '8px';

      card.appendChild(img);
      card.appendChild(name);
      grid.appendChild(card);
    });

    root.appendChild(grid);
  }

  if(!unsubToday){
    unsubToday = subscribeToToday(items=>{
      TODAY_ITEMS = items;
      render();
    });
  }

  render();
}

/* ================= BLOG PAGE ================= */

function initBlogPage(){
  const root = document.getElementById('blog-list');

  function render(){
    root.innerHTML = '';

    if(!ALL_POSTS.length){
      root.innerHTML = '<p class="text-muted">Chưa có bài viết.</p>';
      return;
    }

    ALL_POSTS.forEach(p=>{
      const div = document.createElement('div');
      div.className='post';

      div.innerHTML = `
        <img src="${p.img || PLACEHOLDER_POST}">
        <div>
          <h3>${p.title}</h3>
          <div class="text-muted">${new Date(p.date).toLocaleString()}</div>
          <p>${p.content}</p>
        </div>
      `;

      root.appendChild(div);
    });
  }

  if(!unsubPosts){
    unsubPosts = subscribeToPosts(posts=>{
      ALL_POSTS = posts;
      render();
    });
  }

  render();
}

/* ================= ADMIN PAGE ================= */

async function initAdminPage(){

  const dishContainer = document.getElementById('dish-list');
  const todayListEl = document.getElementById('today-dishes');
  const addForm = document.getElementById('add-dish-form');
  const saveMenuBtn = document.getElementById('save-menu');
  const searchInput = document.getElementById('search-dish');

  if(!unsubDishes){
    unsubDishes = subscribeToDishes(arr=>{
      ALL_DISHES = arr;
      renderGroups(searchInput ? searchInput.value : '');
      renderToday();
    });
  }

  if(!unsubToday){
    unsubToday = subscribeToToday(items=>{
      TODAY_ITEMS = items;
      renderToday();
    });
  }

  const GROUPS = ['Gà','Bò','Cá','Lợn','Rau','Đậu','Trứng','Cơm','Chay','Khác'];

  function renderGroups(filter=''){
    dishContainer.innerHTML='';

    GROUPS.forEach(g=>{
      const items = ALL_DISHES.filter(d =>
        d.group===g && d.name.toLowerCase().includes(filter.toLowerCase())
      );

      if(!items.length) return;

      const wrap = document.createElement('div');
      wrap.className='accordion card';

      const head = document.createElement('div');
      head.className='group-header';
      head.textContent=g;

      const list = document.createElement('div');
      list.className='group-list';

      if(openedGroups.has(g)) list.classList.add('active');

      items.forEach(d=>{
        const row = document.createElement('div');
        row.className='dish-row';

        const cb = document.createElement('input');
        cb.type='checkbox';
        cb.checked = !!d.selected;

        cb.addEventListener('change', async ()=>{
          const dish = ALL_DISHES.find(x=>x.id===d.id);
          if(dish) dish.selected = cb.checked;
          renderToday();
          await updateDishRemote(d.id,{selected:cb.checked});
        });

        const name = document.createElement('div');
        name.textContent = d.name;
        name.style.flex='1';

        row.appendChild(cb);
        row.appendChild(name);

        list.appendChild(row);
      });

      head.addEventListener('click', ()=>{
        list.classList.toggle('active');
        if(list.classList.contains('active')) openedGroups.add(g);
        else openedGroups.delete(g);
      });

      wrap.appendChild(head);
      wrap.appendChild(list);
      dishContainer.appendChild(wrap);
    });
  }

  function renderToday(){
    todayListEl.innerHTML='';
    const selected = ALL_DISHES.filter(d=>d.selected);

    if(!selected.length){
      todayListEl.innerHTML='<li class="text-muted">Chưa chọn món</li>';
      return;
    }

    selected.forEach((d,i)=>{
      const li = document.createElement('li');
      li.textContent=`${i+1}. ${d.name}`;
      todayListEl.appendChild(li);
    });
  }

  addForm.addEventListener('submit', async e=>{
    e.preventDefault();

    const name = document.getElementById('dish-name').value.trim();
    const group = document.getElementById('dish-group').value;
    const file = document.getElementById('dish-img').files[0];

    let imgUrl = '';
    if(file){
      imgUrl = await uploadImageFile(file,'dishes');
    }

    await addDishRemote({
      name,
      group,
      img: imgUrl,
      selected:false
    });

    addForm.reset();
  });

  saveMenuBtn.addEventListener('click', async ()=>{
    const items = ALL_DISHES
      .filter(d=>d.selected)
      .map(d=>({
        id:d.id,
        name:d.name,
        img:d.img || ''
      }));

    await saveTodayMenuRemote(items);
    alert("Đã lưu menu hôm nay");
  });

  renderGroups('');
}

/* ================= INIT ================= */

document.addEventListener('DOMContentLoaded', ()=>{
  if(document.getElementById('menu-list')) initMenuPage();
  if(document.getElementById('blog-list')) initBlogPage();
});