import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {
  Menu, Search, UserRound, ShoppingCart, Dog, Cat, Bird, Rabbit,
  Bone, HeartPulse, Tag, Store, Truck, CheckCircle2, PackageCheck,
  CircleDollarSign, AlertTriangle, ChevronRight, Plus, Minus,
  LayoutDashboard, ClipboardList, Package, Warehouse, X, Trash2,
  Clock
} from 'lucide-react'

const STORAGE_PRODUCTS = 'depaula_demo_products_v4'
const STORAGE_ORDERS = 'depaula_demo_orders_v2'
const STORAGE_CART = 'depaula_demo_cart_v1'

const petPhotos = {
  dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=88',
  cat: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=88',
  bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=88',
  rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=88'
}

const heroBanners = [
  { id: 1, src: '/banners/banner-1.png', alt: "Compre online com mais praticidade" },
  { id: 2, src: '/banners/banner-2.png', alt: "Rações e produtos para cães, gatos, pássaros e coelhos" },
  { id: 3, src: '/banners/banner-3.png', alt: "Ofertas especiais para o seu pet" },
]

const categories = [
  { name: 'Cães', icon: Dog, subtitle: 'Rações, petiscos e acessórios', tone: 'blue', photo: petPhotos.dog },
  { name: 'Gatos', icon: Cat, subtitle: 'Rações, areia higiênica e acessórios', tone: 'pink', photo: petPhotos.cat },
  { name: 'Pássaros', icon: Bird, subtitle: 'Rações, sementes e acessórios', tone: 'yellow', photo: petPhotos.bird },
  { name: 'Coelhos', icon: Rabbit, subtitle: 'Rações, feno, higiene e acessórios', tone: 'green', photo: petPhotos.rabbit },
]

const initialProducts = [
  { id: 1, name: 'Ração Golden Formula Carne e Arroz Cães Adultos 15kg', price: 179.90, stock: 10, category: 'Cães', brand: 'PremieR Golden', image: 'https://down-br.img.susercontent.com/file/aee335f5884fc05f236f2b1f0b616a28' },
  { id: 2, name: 'Petisco Pedigree Dentastix Daily Oral Care', price: 18.90, stock: 19, category: 'Cães', brand: 'Pedigree', image: 'https://petsland-egy.com/cdn/shop/files/5998749109113_FOP.png?v=1736788231' },
  { id: 3, name: 'Ração Whiskas Carne para Gatos Adultos 10,1kg', price: 194.00, stock: 14, category: 'Gatos', brand: 'Whiskas', image: 'https://cdn.awsli.com.br/1714/1714337/produto/266796472/racao-whiskas-carne-gatos-adultos-101-kg-1-removebg-preview-lcbpckuxx1.png' },
  { id: 4, name: 'Ração GranPlus Choice Gatos Adultos Frango e Carne 10,1kg', price: 144.99, stock: 8, category: 'Gatos', brand: 'GranPlus', image: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-lz6mamyp53xhd9' },
  { id: 5, name: 'Areia Higiênica Pipicat Classic 4kg', price: 15.99, stock: 9, category: 'Gatos', brand: 'Pipicat', image: 'https://cdn.awsli.com.br/800x800/1999/1999267/produto/306072262/areia-higienica-para-gatos-pipicat-classic-4kg-7nk4xc7yq5.jpg' },
  { id: 6, name: 'Ração Nutrópica Gourmet para Calopsitas 300g', price: 49.99, stock: 16, category: 'Pássaros', brand: 'Nutrópica', image: 'https://images.petz.com.br/fotos/40013030000640_1752259263314.jpg' },
  { id: 7, name: 'Ração Nutrópica Super Premium Coelho Adulto 500g', price: 49.99, stock: 7, category: 'Coelhos', brand: 'Nutrópica', image: 'https://io.convertiez.com.br/m/petcamp/shop/products/images/1733/large/racao-nutropica-coelho-adulto-500-g-14879_1429.jpg' },
  { id: 8, name: 'Ração Funny Bunny Delícias da Horta 500g', price: 21.99, stock: 12, category: 'Coelhos', brand: 'Supra', image: 'https://cdn.awsli.com.br/800x800/2757/2757567/produto/280078835/7896803071582-1b5smskzoo.png' },
]

const seedOrders = [
  { id: '#1023', customer: 'Mariana Silva', total: 239.88, status: 'Separando', itemCount: 3, fulfillment: 'Retirada', createdAt: new Date().toISOString(), items: [] },
  { id: '#1022', customer: 'Carlos Henrique', total: 90.89, status: 'Pronto', itemCount: 2, fulfillment: 'Retirada', createdAt: new Date().toISOString(), items: [] },
]

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => readStorage(key, fallback))
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)) }, [key, value])
  useEffect(() => {
    const sync = e => {
      if (e.key === key && e.newValue) setValue(JSON.parse(e.newValue))
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [key])
  return [value, setValue]
}

function Logo() {
  return <img className="brand-logo" src="/brand/logo-id-digital.png" alt="D' Paula Casa do Criador" />
}

function money(value) {
  return 'R$ ' + Number(value).toFixed(2).replace('.', ',')
}

function Storefront() {
  const [products, setProducts] = usePersistentState(STORAGE_PRODUCTS, initialProducts)
  const [orders, setOrders] = usePersistentState(STORAGE_ORDERS, seedOrders)
  const [cart, setCart] = usePersistentState(STORAGE_CART, [])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [currentBanner, setCurrentBanner] = useState(0)
  const [loadedBanners, setLoadedBanners] = useState({0:true})
  const [cartOpen, setCartOpen] = useState(false)
  const [ordersOpen, setOrdersOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)
  const [lastAdded, setLastAdded] = useState(null)
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', fulfillment: 'Retirada', address: '', payment: 'Pix' })

  useEffect(() => {
    const preload = (index) => {
      const img = new Image()
      img.src = heroBanners[index].src
      img.onload = () => setLoadedBanners(current => ({...current, [index]: true}))
    }
    const firstFollowUp = window.setTimeout(() => preload(1), 900)
    const secondFollowUp = window.setTimeout(() => preload(2), 1800)
    const timer = window.setInterval(() => setCurrentBanner(p => (p + 1) % heroBanners.length), 6500)
    return () => {
      window.clearTimeout(firstFollowUp)
      window.clearTimeout(secondFollowUp)
      window.clearInterval(timer)
    }
  }, [])

  const filtered = useMemo(() => products.filter(p => {
    const categoryOk = selectedCategory === 'Todos' || p.category === selectedCategory
    const q = query.trim().toLowerCase()
    const queryOk = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    return categoryOk && queryOk
  }), [products, query, selectedCategory])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  function add(product) {
    if (product.stock <= 0) return
    setCart(current => {
      const found = current.find(i => i.id === product.id)
      if (found) return current.map(i => i.id === product.id ? { ...i, qty: Math.min(i.qty + 1, product.stock) } : i)
      return [...current, { ...product, qty: 1 }]
    })
    setLastAdded(product)
    window.setTimeout(() => setLastAdded(null), 1800)
  }

  function changeQty(id, delta) {
    setCart(current => current.map(i => i.id === id ? { ...i, qty: Math.max(0, Math.min(i.stock, i.qty + delta)) } : i).filter(i => i.qty > 0))
  }

  function placeOrder(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || cart.length === 0) return
    if (form.fulfillment === 'Entrega' && !form.address.trim()) return
    const order = {
      id: '#' + (1024 + orders.length + 1),
      customer: form.name.trim(),
      phone: form.phone.trim(),
      total: cartTotal,
      status: 'Novo',
      itemCount: cartCount,
      fulfillment: form.fulfillment,
      address: form.address.trim(),
      payment: form.payment,
      createdAt: new Date().toISOString(),
      items: cart.map(({ id, name, qty, price }) => ({ id, name, qty, price }))
    }
    setOrders(current => [order, ...current])
    setProducts(current => current.map(p => {
      const line = cart.find(i => i.id === p.id)
      return line ? { ...p, stock: Math.max(0, p.stock - line.qty) } : p
    }))
    setCart([])
    setCheckoutOpen(false)
    setCartOpen(false)
    setLastOrder(order)
  }

  return (
    <div className="site-shell">
      <header className="top-header">
        <div className="header-inner">
          <button className="icon-only mobile-menu" aria-label="Abrir categorias" onClick={()=>setMobileCategoriesOpen(true)}><Menu /></button>
          <Logo />
          <div className="search-wrap desktop-search">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="O que seu pet precisa hoje?" />
            <button aria-label="Buscar"><Search size={20}/></button>
          </div>
          <div className="header-actions">
            <button className="header-action" onClick={()=>setOrdersOpen(true)}><UserRound/><span>Meus<br/>Pedidos</span></button>
            <button className="header-action" onClick={()=>setCartOpen(true)}><ShoppingCart/><span>Meu<br/>Carrinho</span><i>{cartCount}</i></button>
          </div>
        </div>
        <div className="mobile-search-wrap">
          <div className="search-wrap"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar produtos..." /><button><Search size={20}/></button></div>

        </div>
      </header>

      <nav className="category-nav">
        <div className="nav-inner">
          <button className="all-categories" onClick={()=>setSelectedCategory('Todos')}><Menu size={18}/> Todas as categorias</button>
          <button onClick={()=>setSelectedCategory('Todos')}><Bone size={18}/> Rações</button>
          {categories.map(c => <button key={c.name} onClick={()=>setSelectedCategory(c.name)}><c.icon size={18}/>{c.name}</button>)}
          <button><HeartPulse size={18}/> Higiene e Saúde</button>
          <button><Tag size={18}/> Promoções</button>
        </div>
      </nav>

      <main>
        <section className="hero-slider-wrap">
          <div className="hero-slider-frame">
            {heroBanners.map((banner, index) => (
              <img
                key={banner.id}
                src={banner.src}
                alt={banner.alt}
                className={'hero-banner-image ' + (index === currentBanner ? 'active' : '')}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'low'}
                decoding="async"
              />
            ))}
            <div className="hero-dots">
              {heroBanners.map((b,index)=><button key={b.id} className={'hero-dot '+(index===currentBanner?'active':'')} onClick={()=>setCurrentBanner(index)}/>)}
            </div>
          </div>
        </section>

        <section className="mobile-category-grid section" aria-label="Categorias">
          <button className={selectedCategory==='Todos'?'active':''} onClick={()=>{setSelectedCategory('Todos');document.getElementById('produtos')?.scrollIntoView({behavior:'smooth'})}}>
            <span><Bone/></span><b>Todos</b><small>Ver catálogo</small>
          </button>
          {categories.map(c => (
            <button key={c.name} className={selectedCategory===c.name?'active':''} onClick={()=>{setSelectedCategory(c.name);document.getElementById('produtos')?.scrollIntoView({behavior:'smooth'})}}>
              <span><c.icon/></span><b>{c.name}</b><small>{c.name==='Cães'?'Rações e petiscos':c.name==='Gatos'?'Rações e higiene':c.name==='Pássaros'?'Sementes e rações':'Rações e feno'}</small>
            </button>
          ))}
        </section>

        <section className="category-cards section">
          {categories.map(c => (
            <button key={c.name} className={'category-card ' + c.tone} onClick={()=>{setSelectedCategory(c.name);document.getElementById('produtos')?.scrollIntoView({behavior:'smooth'})}}>
              <img className="category-photo" src={c.photo} alt={c.name}/>
              <div className="category-copy"><h3>{c.name}</h3><p>{c.subtitle}</p><span>Ver produtos <ChevronRight size={15}/></span></div>
            </button>
          ))}
        </section>

        <section id="produtos" className="section products-section">
          <div className="section-heading">
            <div><h2>Produtos em destaque</h2><span></span><p>Vitrine demonstrativa com produtos reais de mercado.</p></div>
            <button onClick={()=>setSelectedCategory('Todos')}>Ver todos <ChevronRight size={18}/></button>
          </div>
          <div className="products-grid">
            {filtered.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-visual">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e)=>{
                      e.currentTarget.style.display='none'
                      const fallback=e.currentTarget.nextElementSibling
                      if(fallback) fallback.style.display='grid'
                    }}
                  />
                  <div className="product-fallback" aria-hidden="true">
                    <span>{product.brand}</span>
                    <b>{product.category}</b>
                  </div>
                </div>
                <span className="product-brand">{product.brand}</span>
                <h3>{product.name}</h3>
                <div className="rating">★★★★★ <small>produto real</small></div>
                <strong>{money(product.price)}</strong>
                <small>{product.stock > 0 ? 'Estoque demo: ' + product.stock + ' un.' : 'Indisponível'}</small>
                <button disabled={product.stock<=0} onClick={()=>add(product)}><ShoppingCart size={17}/> {product.stock>0?'Adicionar ao carrinho':'Indisponível'}</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section service-banners">
          <div className="service-card pickup"><Store/><div><h3>Retirada na loja</h3><p>Faça o pedido pelo site e retire quando estiver pronto.</p></div><ChevronRight/></div>
          <div className="service-card support"><ShoppingCart/><div><h3>Pedido direto pelo site</h3><p>Catálogo, carrinho e pedido sem depender de atendimento manual.</p></div><ChevronRight/></div>
          <div className="service-card delivery"><Truck/><div><h3>Entrega para a região</h3><p>Fluxo preparado para retirada ou entrega conforme a operação.</p></div><ChevronRight/></div>
        </section>
      </main>

      {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}>
        <aside className="drawer" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><small>SEU PEDIDO</small><h2>Carrinho</h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>
          <div className="drawer-body">
            {cart.length===0 ? <div className="empty-state"><ShoppingCart size={40}/><h3>Seu carrinho está vazio</h3><p>Adicione produtos para iniciar um pedido.</p></div> :
            cart.map(item=><div className="cart-line" key={item.id}>
              <img src={item.image} alt=""/>
              <div><strong>{item.name}</strong><span>{money(item.price)}</span>
                <div className="qty"><button onClick={()=>changeQty(item.id,-1)}><Minus size={14}/></button><b>{item.qty}</b><button onClick={()=>changeQty(item.id,1)}><Plus size={14}/></button></div>
              </div>
              <button className="trash" onClick={()=>setCart(c=>c.filter(i=>i.id!==item.id))}><Trash2 size={18}/></button>
            </div>)}
          </div>
          {cart.length>0 && <div className="drawer-foot">
            <div><span>Total</span><strong>{money(cartTotal)}</strong></div>
            <div className="cart-actions">
              <button className="secondary" onClick={()=>setCartOpen(false)}>Continuar comprando</button>
              <button className="primary" onClick={()=>{setCartOpen(false);setCheckoutOpen(true)}}>Finalizar pedido</button>
            </div>
          </div>}
        </aside>
      </div>}

      {checkoutOpen && <div className="overlay checkout-overlay">
        <div className="modal">
          <div className="drawer-head"><div><small>FINALIZAÇÃO</small><h2>Confirmar pedido</h2></div><button onClick={()=>setCheckoutOpen(false)}><X/></button></div>
          <form className="checkout-form" onSubmit={placeOrder}>
            <label>Nome<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Seu nome"/></label>
            <label>Telefone<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="(62) 99999-9999"/></label>
            <div className="choice-row">
              <button type="button" className={form.fulfillment==='Retirada'?'selected':''} onClick={()=>setForm({...form,fulfillment:'Retirada'})}><Store/> Retirada</button>
              <button type="button" className={form.fulfillment==='Entrega'?'selected':''} onClick={()=>setForm({...form,fulfillment:'Entrega'})}><Truck/> Entrega</button>
            </div>
            {form.fulfillment==='Entrega' && <label>Endereço<input required value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Rua, número e bairro"/></label>}
            <label>Pagamento<select value={form.payment} onChange={e=>setForm({...form,payment:e.target.value})}><option>Pix</option><option>Dinheiro</option><option>Cartão na retirada</option></select></label>
            <div className="checkout-summary"><span>{cartCount} item(ns)</span><strong>{money(cartTotal)}</strong></div>
            <button className="primary" type="submit">Enviar pedido</button>
          </form>
        </div>
      </div>}

      {mobileCategoriesOpen && <div className="overlay mobile-sheet-overlay" onClick={()=>setMobileCategoriesOpen(false)}>
        <div className="mobile-sheet" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><small>NAVEGAÇÃO</small><h2>Categorias</h2></div><button onClick={()=>setMobileCategoriesOpen(false)}><X/></button></div>
          <div className="mobile-sheet-grid">
            <button onClick={()=>{setSelectedCategory('Todos');setMobileCategoriesOpen(false)}}><Bone/><span><b>Todos</b><small>Catálogo completo</small></span></button>
            {categories.map(c=><button key={c.name} onClick={()=>{setSelectedCategory(c.name);setMobileCategoriesOpen(false);setTimeout(()=>document.getElementById('produtos')?.scrollIntoView({behavior:'smooth'}),80)}}><c.icon/><span><b>{c.name}</b><small>{c.subtitle}</small></span></button>)}
          </div>
        </div>
      </div>}

      {ordersOpen && <div className="overlay" onClick={()=>setOrdersOpen(false)}>
        <aside className="drawer" onClick={e=>e.stopPropagation()}>
          <div className="drawer-head"><div><small>ACOMPANHAMENTO</small><h2>Meus pedidos</h2></div><button onClick={()=>setOrdersOpen(false)}><X/></button></div>
          <div className="drawer-body orders-list">
            {orders.length===0 ? <div className="empty-state"><Clock size={40}/><h3>Nenhum pedido ainda</h3></div> :
            orders.slice(0,8).map(o=><div className="customer-order" key={o.id}><div><strong>{o.id}</strong><span>{o.customer}</span></div><b className={'status '+o.status.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}>{o.status}</b><small>{o.itemCount} item(ns) · {money(o.total)} · {o.fulfillment}</small></div>)}
          </div>
        </aside>
      </div>}

      {lastAdded && <div className="toast-cart"><CheckCircle2/><div><strong>Adicionado ao carrinho</strong><span>{lastAdded.name}</span></div><button onClick={()=>setCartOpen(true)}>Ver carrinho</button></div>}
      {lastOrder && <div className="toast-success"><CheckCircle2/><div><strong>Pedido {lastOrder.id} recebido!</strong><span>Agora ele já aparece no painel administrativo.</span></div><button onClick={()=>setLastOrder(null)}><X size={16}/></button></div>}
    </div>
  )
}

function StatCard({icon: Icon, label, value, warn}) {
  return <div className={'stat-card '+(warn?'warn':'')}><div className="stat-icon"><Icon/></div><div><span>{label}</span><strong>{value}</strong></div></div>
}

function Admin() {
  const [orders,setOrders]=usePersistentState(STORAGE_ORDERS,seedOrders)
  const [products,setProducts]=usePersistentState(STORAGE_PRODUCTS,initialProducts)
  const totalSales = orders.filter(o=>o.status!=='Cancelado').reduce((s,o)=>s+Number(o.total||0),0)
  const separating = orders.filter(o=>['Aceito','Separando'].includes(o.status)).length

  function advanceOrder(id) {
    const flow=['Novo','Aceito','Separando','Pronto','Concluído']
    setOrders(current=>current.map(o=>{
      if(o.id!==id) return o
      const idx=flow.indexOf(o.status)
      return {...o,status:flow[Math.min(idx+1,flow.length-1)]}
    }))
  }

  function changeStock(id,delta) {
    setProducts(current=>current.map(p=>p.id===id?{...p,stock:Math.max(0,p.stock+delta)}:p))
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Logo />
        <div className="admin-nav">
          <button className="active"><LayoutDashboard/> Dashboard</button>
          <button><ClipboardList/> Pedidos</button>
          <button><Package/> Produtos</button>
          <button><Warehouse/> Estoque</button>
        </div>
        <Link to="/">← Voltar para loja</Link>
      </aside>
      <main className="admin-main">
        <div className="admin-top"><div><span>PAINEL ADMINISTRATIVO</span><h1>Operação da loja</h1></div><div className="demo-chip">Demo local funcional</div></div>
        <div className="stats-grid">
          <StatCard icon={ClipboardList} label="Pedidos" value={orders.length}/>
          <StatCard icon={CircleDollarSign} label="Vendas registradas" value={money(totalSales)}/>
          <StatCard icon={PackageCheck} label="Em preparação" value={separating}/>
          <StatCard icon={AlertTriangle} label="Estoque baixo" value={products.filter(p=>p.stock<=8).length} warn/>
        </div>

        <section className="admin-panel">
          <div className="panel-title"><div><h2>Pedidos</h2><p>Pedidos feitos na loja aparecem aqui automaticamente neste navegador.</p></div></div>
          <div className="orders-table">
            <div className="table-row table-head"><span>Pedido</span><span>Cliente</span><span>Itens</span><span>Total</span><span>Status</span><span>Ação</span></div>
            {orders.map(order=><div className="table-row" key={order.id}>
              <strong>{order.id}</strong><span>{order.customer}</span><span>{order.itemCount}</span><span>{money(order.total)}</span>
              <span><b className={'status '+order.status.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}>{order.status}</b></span>
              <button className="advance-btn" disabled={order.status==='Concluído'} onClick={()=>advanceOrder(order.id)}>{order.status==='Concluído'?'Concluído':'Avançar status'}</button>
            </div>)}
          </div>
        </section>

        <section className="admin-panel">
          <div className="panel-title"><div><h2>Controle de estoque</h2><p>As alterações refletem na vitrine da loja neste navegador.</p></div></div>
          <div className="stock-grid">
            {products.map(p=><div className="stock-item" key={p.id}>
              <img src={p.image} alt={p.name} loading="lazy" decoding="async"/>
              <div className="stock-info"><strong>{p.name}</strong><span>{p.category} · {money(p.price)}</span></div>
              <div className="stock-control"><button onClick={()=>changeStock(p.id,-1)}><Minus size={16}/></button><b>{p.stock}</b><button onClick={()=>changeStock(p.id,1)}><Plus size={16}/></button></div>
            </div>)}
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App(){
  return <Routes><Route path="/" element={<Storefront/>}/><Route path="/admin" element={<Admin/>}/></Routes>
}
