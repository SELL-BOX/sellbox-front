import { ReactNode } from 'react'
import Header from '../Header'
import {Container} from "react-bootstrap";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  )
}
