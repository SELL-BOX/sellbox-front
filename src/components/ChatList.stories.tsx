import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ChatList } from './ChatList'

export default {
  title: 'Sellbox/ChatList',
  component: ChatList,
} as ComponentMeta<typeof ChatList>

const Template: ComponentStory<typeof ChatList> = (args) => (
  <ChatList {...args} />
)

export const Example = Template.bind({})
Example.args = {
  messages: [
    { message: 'hello', roomId: 1, userId: 'user1' },
    { message: 'world', roomId: 2, userId: 'user2' },
    { message: '123456789\nnew line', roomId: 3, userId: 'user2' },
    { message: 'message', roomId: 4, userId: 'user1' },
  ],
}
