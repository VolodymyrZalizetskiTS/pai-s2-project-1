import { useState } from 'react'
import './App.css'

// =========

const PAGE_SIZE = 5
const GENRES = ['Fantasy', 'Kryminal', 'Sci-fi', 'Klasyka', 'Reportaz']
const RATINGS = [1, 2, 3, 4, 5]
const EMPTY_FORM = { title: '', genre: '', rating: 0, read: false }

// dane testowe
const INITIAL_BOOKS = [
  { id: 1, title: 'h', genre: 'Fantasy', rating: 5, read: true },
  { id: 2, title: 'asd', genre: 'Sci-fi', rating: 3, read: false },
  { id: 3, title: 'test', genre: 'Klasyka', rating: 4, read: true },
  { id: 4, title: 'qwe', genre: 'Fantasy', rating: 2, read: false },
  { id: 5, title: 'ksiazka 1', genre: 'Kryminal', rating: 4, read: true },
  { id: 6, title: 'aaa', genre: 'Sci-fi', rating: 1, read: false },
  { id: 7, title: 'xd', genre: 'Reportaz', rating: 5, read: true },
  { id: 8, title: 'test2', genre: 'Klasyka', rating: 3, read: false },
  { id: 9, title: 'abc', genre: 'Kryminal', rating: 2, read: true },
  { id: 10, title: 'zxc', genre: 'Sci-fi', rating: 4, read: false },
  { id: 11, title: 'hhh', genre: 'Reportaz', rating: 1, read: false },
  { id: 12, title: 'ksiazka 2', genre: 'Klasyka', rating: 5, read: true },
]

// =========

function Button({ children, onClick, variant, disabled, type }) {
  return (
    <button
      type={type || 'button'}
      className={'btn btn-' + (variant || 'primary')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// =========

function Dialog({ title, children }) {
  return (
    <div className="overlay">
      <div className="dialog">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  )
}

// =========

function Pagination({ page, totalPages, onChange }) {
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="pagination">
      <Button variant="secondary" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Poprzednia
      </Button>
      <div className="pages">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            className={p === page ? 'page-btn active' : 'page-btn'}
            onClick={() => onChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <Button variant="secondary" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Nastepna
      </Button>
    </div>
  )
}

// =========

function Filters({ filters, onChange }) {
  return (
    <div className="filters">
      <label className="field">
        <span>Szukaj po tytule</span>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
        />
      </label>

      <label className="field">
        <span>Gatunek</span>
        <select value={filters.genre} onChange={(e) => onChange('genre', e.target.value)}>
          <option value="">Wszystkie</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Sortuj po</span>
        <select value={filters.sortBy} onChange={(e) => onChange('sortBy', e.target.value)}>
          <option value="title">Tytul</option>
          <option value="rating">Ocena</option>
        </select>
      </label>

      <label className="field">
        <span>Kierunek</span>
        <select value={filters.sortDir} onChange={(e) => onChange('sortDir', e.target.value)}>
          <option value="asc">Rosnaco</option>
          <option value="desc">Malejaco</option>
        </select>
      </label>
    </div>
  )
}

// =========

function validate(form) {
  const errors = {}
  if (form.title.trim() === '') {
    errors.title = 'Tytul jest wymagany'
  }
  if (form.genre === '') {
    errors.genre = 'Wybierz gatunek'
  }
  if (form.rating === 0) {
    errors.rating = 'Wybierz ocene'
  }
  return errors
}

function BookForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  function setField(name, value) {
    setForm({ ...form, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      return
    }
    onSubmit(form)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* tytul */}
      <label className="field">
        <span>Tytul</span>
        <input
          type="text"
          className={errors.title ? 'invalid' : ''}
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
        />
        {errors.title && <small className="error">{errors.title}</small>}
      </label>

      {/* gatunek */}
      <label className="field">
        <span>Gatunek</span>
        <select
          className={errors.genre ? 'invalid' : ''}
          value={form.genre}
          onChange={(e) => setField('genre', e.target.value)}
        >
          <option value="">-- wybierz --</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        {errors.genre && <small className="error">{errors.genre}</small>}
      </label>

      {/* ocena */}
      <div className="field">
        <span>Ocena</span>
        <div className={errors.rating ? 'radio-group invalid' : 'radio-group'}>
          {RATINGS.map((r) => (
            <label key={r} className="radio">
              <input
                type="radio"
                name="rating"
                value={r}
                checked={form.rating === r}
                onChange={() => setField('rating', r)}
              />
              {r}
            </label>
          ))}
        </div>
        {errors.rating && <small className="error">{errors.rating}</small>}
      </div>

      {/* przeczytana */}
      <label className="checkbox">
        <input
          type="checkbox"
          checked={form.read}
          onChange={(e) => setField('read', e.target.checked)}
        />
        Przeczytana
      </label>

      <div className="dialog-actions">
        <Button variant="secondary" onClick={onCancel}>Anuluj</Button>
        <Button type="submit">Zapisz</Button>
      </div>
    </form>
  )
}

// =========

function BookCard({ book, onEdit, onDelete }) {
  return (
    <li className="card">
      <div className="card-info">
        <h3>{book.title}</h3>
        <p className="meta">
          {book.genre} | Ocena: {book.rating}/5 | {book.read ? 'Przeczytana' : 'Nieprzeczytana'}
        </p>
      </div>
      <div className="card-actions">
        <Button variant="secondary" onClick={() => onEdit(book)}>Edytuj</Button>
        <Button variant="danger" onClick={() => onDelete(book)}>Usun</Button>
      </div>
    </li>
  )
}

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">Brak wynikow.</p>
  }

  return (
    <ul className="list">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

// =========

export default function App() {
  const [books, setBooks] = useState(INITIAL_BOOKS)
  const [filters, setFilters] = useState({ search: '', genre: '', sortBy: 'title', sortDir: 'asc' })
  const [page, setPage] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editedBook, setEditedBook] = useState(null)
  const [bookToDelete, setBookToDelete] = useState(null)

  // szukanie
  let visible = books.filter((b) => b.title.toLowerCase().includes(filters.search.toLowerCase()))

  // filtr
  if (filters.genre !== '') {
    visible = visible.filter((b) => b.genre === filters.genre)
  }

  // sortowanie
  visible.sort((a, b) => {
    let result
    if (filters.sortBy === 'rating') {
      result = a.rating - b.rating
    } else {
      result = a.title.localeCompare(b.title)
    }
    if (filters.sortDir === 'desc') {
      result = -result
    }
    return result
  })

  // paginacja
  const totalPages = Math.ceil(visible.length / PAGE_SIZE)
  const pageBooks = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function updateFilter(name, value) {
    setFilters({ ...filters, [name]: value })
    setPage(1)
  }

  // dodawanie / edycja
  function openAdd() {
    setEditedBook(null)
    setShowForm(true)
  }

  function openEdit(book) {
    setEditedBook(book)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditedBook(null)
  }

  function handleSave(data) {
    if (editedBook) {
      setBooks(books.map((b) => (b.id === editedBook.id ? { ...data, id: b.id } : b)))
    } else {
      setBooks([...books, { ...data, id: Date.now() }])
    }
    closeForm()
  }

  // usuwanie
  function handleDelete() {
    setBooks(books.filter((b) => b.id !== bookToDelete.id))
    // ostatnia ksiazka na stronie -> strona wczesniej
    if (pageBooks.length === 1 && page > 1) {
      setPage(page - 1)
    }
    setBookToDelete(null)
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Moja biblioteczka</h1>
        <Button onClick={openAdd}>Dodaj ksiazke</Button>
      </div>

      <Filters filters={filters} onChange={updateFilter} />

      <BookList books={pageBooks} onEdit={openEdit} onDelete={setBookToDelete} />

      {totalPages > 0 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}

      {/* dialog dodaj/edytuj */}
      {showForm && (
        <Dialog title={editedBook ? 'Edytuj ksiazke' : 'Nowa ksiazka'}>
          <BookForm
            initial={editedBook || EMPTY_FORM}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </Dialog>
      )}

      {/* dialog usun */}
      {bookToDelete && (
        <Dialog title="Usun ksiazke">
          <p>
            Na pewno usunac <strong>{bookToDelete.title}</strong>?
          </p>
          <div className="dialog-actions">
            <Button variant="secondary" onClick={() => setBookToDelete(null)}>Anuluj</Button>
            <Button variant="danger" onClick={handleDelete}>Usun</Button>
          </div>
        </Dialog>
      )}
    </div>
  )
}
