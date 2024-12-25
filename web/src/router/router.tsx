import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import RootLayout from '../components/RootLayout/RootLayout'
import NotFoundPage from '../components/NotFoundPage/NotFoundPage'
import UsersPage from '../pages/users/users'
import BooksPage from '../pages/books/books'
import UserDetailPage from '../pages/users/[id]'
import BooksDetailPage from '../pages/books/[id]'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Navigate to="/users" />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/users/:id" element={<UserDetailPage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/books/:id" element={<BooksDetailPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router