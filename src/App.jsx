import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {
  Menu, Search, UserRound, ShoppingCart, Dog, Cat, Bird, Rabbit,
  Bone, HeartPulse, Tag, MessageCircle, Store, Truck, CheckCircle2,
  PackageCheck, CircleDollarSign, AlertTriangle, ChevronRight,
  Plus, Minus, LayoutDashboard, ClipboardList, Package, Warehouse
} from 'lucide-react'

const petPhotos = {
  dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=88',
  cat: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=88',
  bird: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=88',
  rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=88'
}

const heroBanners = [
  {
    id: 1,
    src: '/banners/banner-1.png',
    alt: "D' Paula Casa do Criador — compre online com mais praticidade",
  },
  {
    id: 2,
    src: '/banners/banner-2.png',
    alt: "D' Paula Casa do Criador — rações e produtos para cães, gatos, pássaros e coelhos",
  },
  {
    id: 3,
    src: '/banners/banner-3.png',
    alt: "D' Paula Casa do Criador — ofertas especiais para o seu pet",
  },
]

const categories = [
  { name: 'Cães', icon: Dog, subtitle: 'Rações, petiscos e acessórios', tone: 'blue', photo: petPhotos.dog },
  { name: 'Gatos', icon: Cat, subtitle: 'Rações, areia higiênica e acessórios', tone: 'pink', photo: petPhotos.cat },
  { name: 'Pássaros', icon: Bird, subtitle: 'Rações, sementes e acessórios', tone: 'yellow', photo: petPhotos.bird },
  { name: 'Coelhos', icon: Rabbit, subtitle: 'Rações, feno, higiene e acessórios', tone: 'green', photo: petPhotos.rabbit },
]

const initialProducts = [
  { id: 1, name: 'Ração Golden Formula Carne, Arroz e Vegetais Cães Adultos 15kg', price: 179.90, stock: 10, category: 'Cães', brand: 'PremieR', badge: 'GOLDEN', accent: '#123e7c', detail: '15 kg' },
  { id: 2, name: 'Ração Whiskas Carne para Gatos Adultos 10,1kg', price: 199.90, stock: 14, category: 'Gatos', brand: 'Whiskas', badge: 'WHISKAS', accent: '#8d1b8d', detail: '10,1 kg' },
  { id: 3, name: 'Ração GranPlus Choice Gatos Adultos Frango e Carne 10,1kg', price: 119.99, stock: 8, category: 'Gatos', brand: 'GranPlus', badge: 'CHOICE', accent: '#bb1839', detail: '10,1 kg' },
  { id: 4, name: 'Ração Nutrópica Calopsita Gourmet 300g', price: 49.99, stock: 16, category: 'Pássaros', brand: 'Nutrópica', badge: 'GOURMET', accent: '#ecad00', detail: '300 g' },
  { id: 5, name: 'Mistura para Calopsita, Agapornis e Rose Faces 500g', price: 10.50, stock: 24, category: 'Pássaros', brand: 'Nutripássaros', badge: 'MIX AVES', accent: '#d8a400', detail: '500 g' },
  { id: 6, name: 'Areia Pipicat Classic para Gatos 4kg', price: 40.90, stock: 9, category: 'Gatos', brand: 'Pipicat', badge: 'CLASSIC', accent: '#5e6bb4', detail: '4 kg' },
  { id: 7, name: 'Ração Nutrópica para Coelho Adulto Super Premium 500g', price: 49.99, stock: 7, category: 'Coelhos', brand: 'Nutrópica', badge: 'COELHO', accent: '#669a4d', detail: '500 g' },
  { id: 8, name: 'Ração Funny Bunny Delícias da Horta 500g', price: 21.99, stock: 12, category: 'Coelhos', brand: 'Supra', badge: 'FUNNY BUNNY', accent: '#7ca55b', detail: '500 g' },
]

const demoOrders = [
  { id: '#1024', customer: 'Cliente Demo', total: 179.90, status: 'Novo', items: 1 },
  { id: '#1023', customer: 'Mariana Silva', total: 239.88, status: 'Separando', items: 3 },
  { id: '#1022', customer: 'Carlos Henrique', total: 90.89, status: 'Pronto', items: 2 },
]

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark" aria-label="D' Paula Casa do Criador">
        <span className="brand-roof">⌂</span>
        <span className="brand-d">D'</span>
        <small>PAULA</small>
      </div>
      <div className="brand-copy">
        <strong>D' Paula<br/>Casa do Criador</strong>
        <span>Tudo para o bem-estar do seu pet!</span>
      </div>
    </div>
  )
}

function ProductVisual({ product }) {
  return (
    <div className="product-visual" style={{'--accent': product.accent}}>
      <div className="real-pack">
        <div className="pack-top">{product.brand}</div>
        <b>{product.badge}</b>
        <span>{product.category}</span>
        <small>{product.detail}</small>
      </div>
    </div>
  )
}

function Storefront() {
  const [cart, setCart] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [currentBanner, setCurrentBanner] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % heroBanners.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  function nextBanner() {
    setCurrentBanner(prev => (prev + 1) % heroBanners.length)
  }

  function prevBanner() {
    setCurrentBanner(prev => prev === 0 ? heroBanners.length - 1 : prev - 1)
  }

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
          <div className="mobile-category-strip">
            <button onClick={()=>setSelectedCategory('Todos')}><Bone size={16}/> Rações</button>
            {categories.map(c => <button key={c.name} onClick={()=>setSelectedCategory(c.name)}><c.icon size={16}/>{c.name}</button>)}
          </div>
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
        <section className="hero-slider-wrap">
          <div className="hero-slider-frame">
            {heroBanners.map((banner, index) => (
              <img
                key={banner.id}
                src={banner.src}
                alt={banner.alt}
                className={'hero-banner-image ' + (index === currentBanner ? 'active' : '')}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}

            <button className="hero-arrow hero-arrow-left" onClick={prevBanner} aria-label="Banner anterior" type="button">‹</button>
            <button className="hero-arrow hero-arrow-right" onClick={nextBanner} aria-label="Próximo banner" type="button">›</button>

            <div className="hero-dots" aria-label="Navegação dos banners">
              {heroBanners.map((banner, index) => (
                <button
                  key={banner.id}
                  type="button"
                  className={'hero-dot ' + (index === currentBanner ? 'active' : '')}
                  onClick={() => setCurrentBanner(index)}
                  aria-label={'Ir para banner ' + (index + 1)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="category-cards section">
          {categories.map(c => (
            <button key={c.name} className={'category-card ' + c.tone} onClick={()=>setSelectedCategory(c.name)}>
              <img className="category-photo" src={c.photo} alt={c.name}/>
              <div className="category-copy"><h3>{c.name}</h3><p>{c.subtitle}</p><span>Ver produtos <ChevronRight size={15}/></span></div>
            </button>
          ))}
        </section>

        <section id="produtos" className="section products-section">
          <div className="section-heading">
            <div><h2>Produtos em destaque</h2><span></span><p>Itens reais usados como referência visual para a demonstração.</p></div>
            <button onClick={()=>setSelectedCategory('Todos')}>Ver todos os produtos <ChevronRight size={18}/></button>
          </div>
          <div className="products-grid">
            {products.map(product => (
              <article className="product-card" key={product.id}>
                <ProductVisual product={product}/>
                <span className="product-brand">{product.brand}</span>
                <h3>{product.name}</h3>
                <div className="rating">★★★★★ <small>produto de referência</small></div>
                <strong>R$ {product.price.toFixed(2).replace('.', ',')}</strong>
                <small>Estoque demo: {product.stock} unidades</small>
                <button onClick={()=>add(product)}><ShoppingCart size={17}/> Adicionar ao carrinho</button>
              </article>
            ))}
          </div>
        </section>

        <section className="section service-banners">
          <div className="service-card pickup"><Store/><div><h3>Retirada na loja</h3><p>Compre online, receba a confirmação e retire quando estiver pronto.</p></div><ChevronRight/></div>
          <div className="service-card support"><MessageCircle/><div><h3>Atendimento via WhatsApp</h3><p>Dúvidas sobre ração, tamanho ou disponibilidade? Fale com a loja.</p></div><ChevronRight/></div>
          <div className="service-card delivery"><Truck/><div><h3>Entrega para a região</h3><p>Fluxo preparado para incluir entrega conforme a operação da loja.</p></div><ChevronRight/></div>
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