import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import RoomSettingForm from './RoomSettingForm'

export default {
  title: 'Sellbox/RoomSettingForm',
  component: RoomSettingForm,
} as ComponentMeta<typeof RoomSettingForm>

const Template: ComponentStory<typeof RoomSettingForm> = (args) => (
  <RoomSettingForm {...args} />
)

export const Example = Template.bind({})
Example.args = {}
