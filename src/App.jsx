import { useMemo, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {
  Menu, Search, UserRound, ShoppingCart, Dog, Cat, Bird, Rabbit,
  Bone, HeartPulse, Tag, MessageCircle, Store, Truck, CheckCircle2,
  PackageCheck, Boxes, CircleDollarSign, AlertTriangle, ChevronRight,
  Plus, Minus, LayoutDashboard, ClipboardList, Package, Warehouse
} from 'lucide-react'

const categories = [
  { name: 'Cães', icon: Dog, subtitle: 'Rações, petiscos e acessórios', tone: 'blue' },
  { name: 'Gatos', icon: Cat, subtitle: 'Rações, areia higiênica e acessórios', tone: 'pink' },
  { name: 'Pássaros', icon: Bird, subtitle: 'Rações, sementes e acessórios', tone: 'yellow' },
  { name: 'Coelhos', icon: Rabbit, subtitle: 'Rações, feno, higiene e acessórios', tone: 'green' },
]

const initialProducts = [
  { id: 1, name: 'Ração Golden Cães Adultos Carne e Arroz 15kg', price: 189.90, stock: 10, category: 'Cães', badge: 'GOLDEN', accent: '#123e7c' },
  { id: 2, name: 'Ração Whiskas Gatos Adultos Carne 10,1kg', price: 119.90, stock: 14, category: 'Gatos', badge: 'WHISKAS', accent: '#8d1b8d' },
  { id: 3, name: 'Ração Premium Pássaros Seleção 500g', price: 22.90, stock: 22, category: 'Pássaros', badge: 'AVES', accent: '#f4b700' },
  { id: 4, name: 'Ração Coelhos Adultos 700g', price: 34.90, stock: 6, category: 'Coelhos', badge: 'BUNNY', accent: '#6e9d67' },
  { id: 5, name: 'Petisco Dental para Cães 90g', price: 18.90, stock: 19, category: 'Cães', badge: 'PETISCO', accent: '#e26b2e' },
  { id: 6, name: 'Areia Higiênica Premium 4kg', price: 29.90, stock: 9, category: 'Gatos', badge: 'AREIA', accent: '#6e5fb7' },
  { id: 7, name: 'Mix de Sementes Premium 1kg', price: 19.90, stock: 17, category: 'Pássaros', badge: 'MIX', accent: '#ca8b00' },
  { id: 8, name: 'Feno Natural Selecionado 500g', price: 27.90, stock: 8, category: 'Coelhos', badge: 'FENO', accent: '#729d3b' },
]

const demoOrders = [
  { id: '#1024', customer: 'Cliente Demo', total: 189.90, status: 'Novo', items: 1 },
  { id: '#1023', customer: 'Mariana Silva', total: 238.70, status: 'Separando', items: 3 },
  { id: '#1022', customer: 'Carlos Henrique', total: 92.50, status: 'Pronto', items: 2 },
]

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark"><span>D'</span><small>PAULA</small></div>
      <div>
        <strong>D' Paula<br/>Casa do Criador</strong>
        <span>Tudo para o bem-estar do seu pet!</span>
      </div>
    </div>
  )
}

function ProductVisual({ product }) {
  return (
    <div className="product-visual" style={{'--accent': product.accent}}>
      <div className="bag">
        <small>D' PAULA</small>
        <b>{product.badge}</b>
        <span>{product.category}</span>
      </div>
    </div>
  )
}

function Storefront() {
  const [cart, setCart] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const products = useMemo(() => initialProducts.filter(p => {
    const categoryOk = selectedCategory === 'Todos' || p.category === selectedCategory
    const queryOk = p.name.toLowerCase().includes(query.toLowerCase())
    return categoryOk && queryOk
  }), [query, selectedCategory])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  function add(product) {
    setCart(current => {
      const found = current.find(i => i.id === product.id)
      if (found) return current.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i)
      return [...current, {...product, qty: 1}]
    })
  }

  return (
    <div className="site-shell">
      <header className="top-header">
        <div className="header-inner">
          <button className="icon-only mobile-menu" aria-label="Abrir menu"><Menu /></button>
          <Logo />
          <div className="search-wrap desktop-search">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="O que seu pet precisa hoje?" />
            <button><Search size={20}/></button>
          </div>
          <div className="header-actions">
            <button className="header-action"><UserRound/><span>Minha<br/>Conta</span></button>
            <button className="header-action"><ShoppingCart/><span>Meu<br/>Carrinho</span><i>{cart.reduce((s,i)=>s+i.qty,0)}</i></button>
            <a className="whatsapp desktop-wa" href="#"><MessageCircle/> Fale pelo WhatsApp</a>
          </div>
        </div>
        <div className="mobile-search-wrap">
          <div className="search-wrap"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="O que seu pet precisa hoje?" /><button><Search size={20}/></button></div>
          <a className="whatsapp" href="#"><MessageCircle/> Fale pelo WhatsApp <ChevronRight size={18}/></a>
        </div>
      </header>

      <nav className="category-nav">
        <div className="nav-inner">
          <button className="all-categories" onClick={()=>setSelectedCategory('Todos')}><Menu size={18}/> Todas as categorias</button>
          <button onClick={()=>setSelectedCategory('Todos')}><Bone size={18}/> Rações</button>
          {categories.map(c => <button key={c.name} onClick={()=>setSelectedCategory(c.name)}><c.icon size={18}/>{c.name}</button>)}
          <button><HeartPulse size={18}/> Higiene e Saúde</button>
          <button><Tag size={18}/> Promoções</button>
          <Link to="/admin" className="admin-link">Painel ADM</Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <h1>Rações e produtos <span>para cães, gatos, pássaros e coelhos!</span></h1>
            <p>Qualidade, bem-estar e tudo o que seu pet precisa em um só lugar.</p>
            <button onClick={()=>document.getElementById('produtos')?.scrollIntoView({behavior:'smooth'})}>Ver produtos <ChevronRight/></button>
          </div>
          <div className="hero-animals" aria-label="Cães, gatos, pássaros e coelhos">
            <div className="animal animal-dog">🐶</div>
            <div className="animal animal-cat">🐱</div>
            <div className="animal animal-bird">🐦</div>
            <div className="animal animal-rabbit">🐰</div>
            <div className="hero-note">Pets felizes<br/>tornam a vida<br/>mais especial! ♡</div>
          </div>
          <div className="hero-features">
            <div><Truck/><span>Entrega para<br/>toda a região</span></div>
            <div><Store/><span>Retirada<br/>na loja</span></div>
            <div><CheckCircle2/><span>Produtos<br/>de qualidade</span></div>
            <div><Dog/><span>Atendimento<br/>especializado</span></div>
          </div>
        </section>

        <section className="category-cards section">
          {categories.map(c => (
            <button key={c.name} className={'category-card ' + c.tone} onClick={()=>setSelectedCategory(c.name)}>
              <div className="category-pet"><c.icon size={72}/></div>
              <div><h3>{c.name}</h3><p>{c.subtitle}</p><span>Ver produtos <ChevronRight size={15}/></span></div>
            </button>
          ))}
        </section>

        <section id="produtos" className="section products-section">
          <div className="section-heading"><div><h2>Produtos em destaque</h2><span></span></div><button onClick={()=>setSelectedCategory('Todos')}>Ver todos os produtos <ChevronRight size={18}/></button></div>
          <div className="products-grid">
            {products.map(product => (
              <article className="product-card" key={product.id}>
                <ProductVisual product={product}/>
                <h3>{product.name}</h3>
                <div className="rating">★★★★★ <small>(demo)</small></div>
                <strong>R$ {product.price.toFixed(2).replace('.', ',')}</strong>
                <small>Estoque: {product.stock} unidades</small>
                <button onClick={()=>add(product)}><ShoppingCart size={17}/> Adicionar ao carrinho</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section service-banners">
          <div className="service-card pickup"><Store/><div><h3>Retirada na loja</h3><p>Compre online e retire na loja com toda a comodidade.</p></div></div>
          <div className="service-card support"><MessageCircle/><div><h3>Atendimento via WhatsApp</h3><p>Tire suas dúvidas, peça indicações e receba atendimento especial.</p></div></div>
          <div className="service-card delivery"><Truck/><div><h3>Entrega para toda a região</h3><p>Seu pedido com segurança e rapidez.</p></div></div>
        </section>

        {cart.length > 0 && (
          <div className="floating-cart">
            <div><ShoppingCart/><span>{cart.reduce((s,i)=>s+i.qty,0)} itens</span></div>
            <strong>R$ {cartTotal.toFixed(2).replace('.', ',')}</strong>
            <button onClick={()=>alert('Checkout demonstrativo: pedido criado com sucesso!')}>Finalizar pedido</button>
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({icon: Icon, label, value, warn}) {
  return <div className={'stat-card ' + (warn ? 'warn' : '')}><div className="stat-icon"><Icon/></div><div><span>{label}</span><strong>{value}</strong></div></div>
}

function Admin() {
  const [orders, setOrders] = useState(demoOrders)
  const [products, setProducts] = useState(initialProducts)

  function advanceOrder(id) {
    const flow = ['Novo','Aceito','Separando','Pronto','Concluído']
    setOrders(current => current.map(o => {
      if (o.id !== id) return o
      const idx = flow.indexOf(o.status)
      return {...o, status: flow[Math.min(idx + 1, flow.length - 1)]}
    }))
  }

  function changeStock(id, delta) {
    setProducts(current => current.map(p => p.id === id ? {...p, stock: Math.max(0, p.stock + delta)} : p))
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
        <div className="admin-top"><div><span>PAINEL ADMINISTRATIVO</span><h1>Hoje na D' Paula</h1></div><div className="demo-chip">Dados da demonstração</div></div>
        <div className="stats-grid">
          <StatCard icon={ClipboardList} label="Pedidos hoje" value="12"/>
          <StatCard icon={CircleDollarSign} label="Vendas hoje" value="R$ 1.487,30"/>
          <StatCard icon={PackageCheck} label="Em separação" value="3"/>
          <StatCard icon={AlertTriangle} label="Estoque baixo" value={products.filter(p=>p.stock<=8).length} warn/>
        </div>

        <section className="admin-panel">
          <div className="panel-title"><div><h2>Pedidos recentes</h2><p>Acompanhe e atualize o status em tempo real.</p></div><button>Ver todos</button></div>
          <div className="orders-table">
            <div className="table-row table-head"><span>Pedido</span><span>Cliente</span><span>Itens</span><span>Total</span><span>Status</span><span>Ação</span></div>
            {orders.map(order => (
              <div className="table-row" key={order.id}>
                <strong>{order.id}</strong><span>{order.customer}</span><span>{order.items}</span><span>R$ {order.total.toFixed(2).replace('.', ',')}</span>
                <span><b className={'status ' + order.status.toLowerCase().replace('í','i')}>{order.status}</b></span>
                <button className="advance-btn" onClick={()=>advanceOrder(order.id)}>Avançar status</button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="panel-title"><div><h2>Controle de estoque</h2><p>Ajuste a disponibilidade dos principais produtos.</p></div></div>
          <div className="stock-grid">
            {products.slice(0,6).map(p => (
              <div className="stock-item" key={p.id}>
                <ProductVisual product={p}/>
                <div className="stock-info"><strong>{p.name}</strong><span>{p.category}</span></div>
                <div className="stock-control">
                  <button onClick={()=>changeStock(p.id,-1)}><Minus size={16}/></button><b>{p.stock}</b><button onClick={()=>changeStock(p.id,1)}><Plus size={16}/></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return <Routes><Route path="/" element={<Storefront/>}/><Route path="/admin" element={<Admin/>}/></Routes>
}