import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensaje', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: 'ingreso correctamentes'
  });
});

router.post('/mensaje', (req: Request, res: Response) => {
  //
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const data = { de, cuerpo };
  const server = Server.instance;
  server.io.emit('mensaje-nuevo', data);

  res.json({
    ok: true,
    cuerpo,
    de
  });
});

router.post('/mensaje/:id', (req: Request, res: Response) => {
  //123
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const data = { de, cuerpo };
  const server = Server.instance;
  server.io.in(id).emit('mensaje-privado', data);

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});

export default router;
