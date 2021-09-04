import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import EventsComponent from './Events'
import { server, rest } from '../../mocks/server'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as localizedFormat from 'dayjs/plugin/localizedFormat'
import * as dayjs from 'dayjs'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

jest.mock('dayjs', () => ({ format: jest.fn(), extend: jest.fn() }))

let queryClient
beforeEach(() => {
    queryClient = new QueryClient({defaultOptions: {
        queries:{
            retry: false
        }
    }})
})
const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)


test('load and displays moods table', async () => {

    render(<EventsComponent />, { wrapper })

    await screen.findByText('Loading')

    await waitFor(() => {
        expect(screen.getByText('Date')).toBeInTheDocument()
        expect(screen.getByText('Mood')).toBeInTheDocument()
    })

})

test('displays error message if no results', async () => {

    server.use(
        rest.get('https://afternoon-peak-67651.herokuapp.com/events', (req, res, ctx) => {
            return res(ctx.status(500))
        })
    )

    render(<EventsComponent />, { wrapper })

    const errorMsg = await screen.findByText("Sorry, we couldn't load care events")
    expect(errorMsg).toBeInTheDocument()

})