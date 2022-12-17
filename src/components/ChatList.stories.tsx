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
    { message: 'hello', roomId: 'roomId', userId: 'user1' },
    { message: 'world', roomId: 'roomId', userId: 'user2' },
    { message: '123456789\nnew line', roomId: 'roomId', userId: 'user2' },
    { message: 'message', roomId: 'roomId', userId: 'user1' },
  ],
}
