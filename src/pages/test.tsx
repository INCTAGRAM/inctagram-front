import style from './test.module.css'
import { InputText } from '@/common/ui/inputText/InputText'
import { InputPassword } from '@/common/ui/inputPassword/InputPassword'
import { Button } from '@/common/ui/button/Button'

export default function Test() {
  return (
    <div style={{ background: '#000000', padding: '40px' }}>
      <InputText fieldName={'Email'} className={style.test} />
      <InputPassword fieldName={'Password'} className={style.test} />
      <Button>Кнопка</Button>
    </div>
  )
}
