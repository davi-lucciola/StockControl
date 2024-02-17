import decouple as env
from typing import Generator
from sqlmodel import Session, create_engine


engine = create_engine(env.config('DATABASE_URL'))

def get_db() -> Generator[Session, None, None]:
    global engine
    session = Session(bind=engine)
    try:
        yield session
    finally:
        session.close()