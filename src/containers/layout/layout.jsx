import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import { useIsMobile } from "../../hooks/useScreenType"
import { isAuthPages, notAuthPages } from "../../routing/routes"
import Navbar from "./navbar/Navbar"
import Sidebar from "./sidebar/Sidebar"

import Payment from "../../Pages/payment/Payment"
import Result from "../../Pages/result/Result"
import Subscribe from "../../components/Subscribe/Subscribe"
import { PAYMENT_PAGE, PAYMENT_RESULT } from "../../routing/pats"
import "./layout.css"

export default function MainLayout() {
	const isMobile = useIsMobile()
	const [close, setClose] = useState(!isMobile)
	const auth = useSelector(state => state.auth.isAuth)
	const data = useSelector(state => state.auth.admin)
	useEffect(() => {
		setClose(!isMobile)
	}, [isMobile])
	return (
		<div className='home'>
			{data?.role == "owner" ? (
				data?.subscribe && close ? (
					<Sidebar close={close} setClose={setClose} />
				) : data?.variant == "0" && close ? (
					<Sidebar close={close} setClose={setClose} />
				) : null
			) : (
				close && <Sidebar close={close} setClose={setClose} />
			)}
			<div
				className='homeContainer'
				style={{ display: isMobile && close ? "none" : "block" }}
			>
				<Navbar close={close} setClose={setClose} />
				{data?.role == "owner" ? (
					data?.subscribe ? (
						<Routes>
							{auth
								? isAuthPages.map(i => {
										return (
											<Route path={i.path} element={i.Component} key={i.id} />
										)
								  })
								: notAuthPages.map(i => {
										return (
											<Route
												path={i.path}
												element={<i.Component />}
												key={i.id}
											/>
										)
								  })}
						</Routes>
					) : data?.variant == "0" ? (
						<Routes>
							{auth
								? isAuthPages.map(i => {
										return (
											<Route path={i.path} element={i.Component} key={i.id} />
										)
								  })
								: notAuthPages.map(i => {
										return (
											<Route
												path={i.path}
												element={<i.Component />}
												key={i.id}
											/>
										)
								  })}
						</Routes>
					) : (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "90vh",
							}}
						>
							<Routes>
								<Route path='/home/:type' element={<Subscribe />} />
								<Route path={PAYMENT_PAGE} element={<Payment />} />
								<Route path={PAYMENT_RESULT} element={<Result />} />
							</Routes>
						</Box>
					)
				) : (
					<Routes>
						{auth
							? isAuthPages.map(i => {
									return (
										<Route path={i.path} element={i.Component} key={i.id} />
									)
							  })
							: notAuthPages.map(i => {
									return (
										<Route path={i.path} element={<i.Component />} key={i.id} />
									)
							  })}
					</Routes>
				)}
			</div>
		</div>
	)
}
