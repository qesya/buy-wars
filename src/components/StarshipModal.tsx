import React from 'react';
import { Modal, Loading, Heading, ContainedList, ContainedListItem, OrderedList, ListItem } from '@carbon/react';
import { useGetPilotsQuery } from '../services/queries/useGetPilotsQuery';
import { useGetStarshipQuery } from '../services/queries/useGetStarshipQuery';
import { useGetFilmsQuery } from '../services/queries/useGetFilmsQuery';
import { StarShipImage } from '../services/starshipsImages';

interface StarshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  starshipUrl: string;
  onBuy: () => void;
  starshipName: string;
}

const StarshipModal: React.FC<StarshipModalProps> = ({ isOpen, onClose, starshipUrl, onBuy, starshipName }) => {
  const { starship, starshipLoading, starshipError } = useGetStarshipQuery(starshipUrl, starshipName);
  const { pilots, pilotsError, pilotsLoading } = useGetPilotsQuery(starship?.pilots, starshipName);
  const { films, filmsError, filmsLoading } = useGetFilmsQuery(starship?.films, starshipName);

  const starshipImage = StarShipImage.find(image => image.name === starshipName)?.url;

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onRequestClose={onClose}
      size="lg"
      modalLabel="Starship Details"
      secondaryButtonText="Close"
      primaryButtonText="Buy"
      onRequestSubmit={onBuy}
      onSecondarySubmit={onClose}
    >
      {starshipLoading || pilotsLoading || filmsLoading ? (
        <Loading role='status'/>
      ) : starshipError || pilotsError || filmsError ? (
        <p>Error loading details.</p>
      ) : starship ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Heading className="mb-0">{starship.name}</Heading>
            {starshipImage && (
              <img src={starshipImage} alt={starship.name} className="w-full h-[360px] object-contain my-8" />
            )}
            <ContainedList label={starship.name} size="md" kind="on-page">
              <ContainedListItem>
                Model: <br />
                <span>{starship.model}</span>
              </ContainedListItem>
              <ContainedListItem>
                Manufacturer: <br />
                <span>{starship.manufacturer}</span>
              </ContainedListItem>
              <ContainedListItem>
                Cost: <br />
                <span>{starship.cost_in_credits}</span>
              </ContainedListItem>
              <ContainedListItem>
                Length: <br />
                <span>{starship.length}</span>
              </ContainedListItem>
              <ContainedListItem>
                Max Atmosphering Speed: <br />
                <span>{starship.max_atmosphering_speed}</span>
              </ContainedListItem>
              <ContainedListItem>
                Crew: <br />
                <span>{starship.crew}</span>
              </ContainedListItem>
              <ContainedListItem>
                Passengers: <br />
                <span>{starship.passengers}</span>
              </ContainedListItem>
              <ContainedListItem>
                Cargo Capacity: <br />
                <span>{starship.cargo_capacity}</span>
              </ContainedListItem>
              <ContainedListItem>
                Consumables: <br />
                <span>{starship.consumables}</span>
              </ContainedListItem>
              <ContainedListItem>
                Hyperdrive Rating: <br />
                <span>{starship.hyperdrive_rating}</span>
              </ContainedListItem>
              <ContainedListItem>
                MGLT: <br />
                <span>{starship.MGLT}</span>
              </ContainedListItem>
              <ContainedListItem>
                Starship Class: <br />
                <span>{starship.starship_class}</span>
              </ContainedListItem>
            </ContainedList>
          </div>
          <div className="flex flex-col px-4">
            <Heading className="mb-4 -mx-4">Pilots:</Heading>
            {pilots ? (
              pilots.length > 0 ? (
                <OrderedList native>
                  {pilots.map(pilot => (
                    <ListItem key={pilot.url}>
                      {pilot.name} ({pilot.gender})
                    </ListItem>
                  ))}
                </OrderedList>
              ) : (
                <p className="-mx-4">N/A</p>
              )
            ) : (
              <p className="-mx-4">N/A</p>
            )}
          </div>
          <div className="flex flex-col px-4">
            <Heading className="mb-4 -mx-4">Films:</Heading>
            {films ? (
              films.length > 0 ? (
                <OrderedList native className="mx-4">
                  {films.map(film => (
                    <ListItem key={film.url}>
                      {film.title} ({film.release_date})
                    </ListItem>
                  ))}
                </OrderedList>
              ) : (
                <p className="-mx-4">N/A</p>
              )
            ) : (
              <p className="-mx-4">N/A</p>
            )}
          </div>
        </div>
      ) : (
        <p>Details not available.</p>
      )}
    </Modal>
  );
};

export default StarshipModal;
