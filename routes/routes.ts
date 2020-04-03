import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuarioConectados } from '../sockets/sockets';

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

//Servicio para obtener todos los IDs de los usuarios

router.get('/usuarios', (req: Request, res: Response) => {
  //123

  const server = Server.instance;
  server.io.clients((err: any, clientes: Socket) => {
    if (err) {
      return res.json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      clientes
    });
  });
});

//Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {
  //

  res.json({
    ok: true,
    clientes: usuarioConectados.getLista()
  });
});
//
export default router;
